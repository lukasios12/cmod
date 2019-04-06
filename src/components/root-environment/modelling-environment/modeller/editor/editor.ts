import { Vue, Component, Watch } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import { getModule } from "vuex-module-decorators";
import DrawerSettingsModule from "src/store/drawer-settings";
import ModellerModule from"src/store/modeller"
import PetrinetModule from "src/store/petrinet";
import FeedbackModule from "src/store/feedback";

import Petrinet from "src/editor/system/petrinet/petrinet";
import Graph from "src/editor/system/graph/graph";
import State from "src/editor/system/graph/state";
import Edge from "src/editor/system/graph/edge";
import Marking from "src/editor/system/marking";
import IntegerTokenCount from "src/editor/system/tokens/integer-token-count";
import OmegaTokenCount from "src/editor/system/tokens/omega-token-count";

import Drawing from "src/editor/drawing/drawing";
import GraphDrawing from "src/editor/drawing/graph-drawing";
import GraphDrawingOptions from "src/editor/drawing/graph-drawing-options";
import { isDraggable } from "src/editor/drawing/draggable-drawing";

import Vector2D from "src/editor/shapes/vector2d";

import Drawer from "src/editor/drawer/drawer";
import DrawerOptions from "src/editor/drawer/drawer-options";
import Feedback from "src/editor/feedback/feedback";
import FeedbackCode from "src/editor/feedback/feedback-code";
import FeedbackService from "src/services/feedback";

import AddState from "src/editor/actions/add-state";
import AddEdge from "src/editor/actions/add-edge";
import AddInitial from "src/editor/actions/add-initial";
import DeleteState from "src/editor/actions/del-state";
import DeleteEdge from "src/editor/actions/del-edge";
import DeleteInitial from "src/editor/actions/del-initial";
import EditState from "src/editor/actions/edit-state";
import EditEdge from "src/editor/actions/edit-edge";

import { ActionManager } from "lib/action-manager/action-manager";
import { HashSet } from "lib/collections/hashset/hash-set";
import { hashString, eqStrings } from "lib/collections/extensions/string-extension";

@WithRender
@Component({
    name: "editor",
})
export default class Editor extends Vue {
    protected drawer: Drawer;
    protected actionManager: ActionManager;

    public graph: Graph;
    public graphDrawing: GraphDrawing;
    public graphDrawingOptions: GraphDrawingOptions;

    public selection: Drawing | null;
    public selectionId: number | null;

    mounted () {
        let canvas = <HTMLCanvasElement><unknown>document.getElementById("editorCanvas");
        this.drawer = new Drawer(canvas, this.settings);
        this.actionManager = new ActionManager();
        this.actionManager.addHook(() => {
            this.drawer.draw(this.graphDrawing);
            let mod = getModule(FeedbackModule, this.$store);
            mod.get(this.graph);
        });
        this.selection = null;
        this.selectionId = null;
        this.registerEvents();
        this.graph = new Graph();
        this.graphDrawing = new GraphDrawing();
        this.graphDrawingOptions = new GraphDrawingOptions();
        this.graphDrawing.options = this.graphDrawingOptions;
    }

    public addState(state: State, position: Vector2D | null = null): void {
        let a = new AddState(state, this.graph, this.graphDrawing, position);
        this.actionManager.exec(a);
    }

    public addEdge(edge: Edge): void {
        let a = new AddEdge(edge, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public delState(id: number): void {
        let a = new DeleteState(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public delEdge(id: number): void {
        let a = new DeleteEdge(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public editState(id: number, state: State): void {
        let a = new EditState(id, state, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public editEdge(id: number, label: string): void {
        let a = new EditEdge(id, label, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public setInitial(id: number): void {
        if (this.graph.hasState(id)) {
            let a = new AddInitial(id, this.graph, this.graphDrawing);
            this.actionManager.exec(a);
        }
    }

    public unsetInitial(): void {
        let id = this.graph.initial;
        if (id !== null) {
            let a = new DeleteInitial(id, this.graph, this.graphDrawing);
            this.actionManager.exec(a);
        }
    }

    public select(pos: Vector2D, context: CanvasRenderingContext2D): void {
        this.selectionId  = this.graphDrawing.getDrawingAt(pos, context);
        this.selection = this.selectionId !== null ?
            this.graphDrawing.getDrawing(this.selectionId) :
            null;
        this.graphDrawingOptions.selected = this.selectionId;
    }

    public setFeedback(feedback: Feedback): void {
        this.graphDrawingOptions.feedback = feedback;
        this.graphDrawing.options = this.graphDrawingOptions;
        this.drawer.draw();
    }

    public setSettings(settings: DrawerOptions) {
        this.drawer.setOptions(settings);
    }

    protected registerEvents(): void {
        this.drawer.registerEvents();

        window.addEventListener("offline", (event) => {
            alert("You seem to be offline, you cannot receive feedback while offline");
        });

        let canvas = this.drawer.canvas;
        let context = canvas.getContext("2d");

        // key events
        canvas.addEventListener("keydown", (event) => {
            switch(event.keyCode) {
                case 46: // delete
                    let graph = this.graph;
                    if (this.selectionId != null) {
                        if (graph.hasState(this.selectionId)) {
                            this.delState(this.selectionId);
                        } else if (graph.hasEdge(this.selectionId)) {
                            this.delEdge(this.selectionId);
                        }
                    }
                    break;
                case 65: // a
                    let state = new Marking(this.petrinet);
                    this.addState(state);
                    break;
                case 69: // e
                    if (this.selectionId !== null && 
                        this.graph.hasState(this.selectionId)
                    ) {
                        console.log("editing");
                    }
                    break;
                case 73: // i
                    if (this.selectionId !== null) {
                        this.setInitial(this.selectionId);
                    } else {
                        this.unsetInitial();
                    }
                    break;
                case 89: // y
                    if(event.ctrlKey) {
                        this.actionManager.redo();
                    }
                    break;
                case 90: // z
                    if(event.ctrlKey && !event.shiftKey) {
                        this.actionManager.undo();
                    } else if(event.ctrlKey && event.shiftKey) {
                        this.actionManager.redo();
                    }
                    break;
            }
        });

        // mouse events
        let mouseDownLeft= false;
        canvas.addEventListener("mousedown", (event) => {
            if(event.buttons == 1) { // left click
                let point = this.drawer.globalToLocal(event);
                if (this.selectionId !== null && event.ctrlKey) {
                    let id = this.graphDrawing.getDrawingAt(point, context);
                    let transitions = this.petrinet.getTransitions().toArray();
                    let edge = new Edge(this.selectionId, id, transitions[0]);
                    this.addEdge(edge);
                } else {
                    this.select(point, context);
                }
                mouseDownLeft= true;
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            if(mouseDownLeft && this.selection && isDraggable(this.selection)) {
                let point = this.drawer.globalToLocal(event);
                this.selection.drag(point, context!);
                this.drawer.draw();
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            mouseDownLeft = false;
            this.drawer.draw();
        });
    }

    get petrinet() {
        let mod = getModule(PetrinetModule, this.$store);
        return mod.petrinet;
    }

    @Watch('petrinet', {deep: true, immediate: false})
    onPetrinetChange() {
        console.log("The Petri net changed to:", this.petrinet);
    }

    get feedback() {
        let mod = getModule(FeedbackModule, this.$store);
        return mod.feedback;
    }

    @Watch('feedback', {deep: true, immediate: false})
    onFeedbackChange() {
        this.setFeedback(this.feedback);
    }

    get settings() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings;
    }

    @Watch('settings', {deep:true, immediate: false})
    onSettingsChange() {
        this.drawer.draw();
    }

    get isResizing() {
        let mod = getModule(ModellerModule, this.$store);
        return mod.resizing;
    }

    @Watch('isResizing', {deep: true, immediate: false})
    onResizeChange() {
        this.drawer.resize();
    }
}

