import Petrinet from "./system/petrinet/petrinet";
import Graph from "./system/graph/graph";
import State from "./system/graph/state";
import Edge from "./system/graph/edge";
import Marking from "./system/marking";
import IntegerTokenCount from "./system/tokens/integer-token-count";
import OmegaTokenCount from "./system/tokens/omega-token-count";

import Drawing from "./drawing/drawing";
import GraphDrawing from "./drawing/graph-drawing";
import GraphDrawingOptions from "./drawing/graph-drawing-options";
import { isDraggable } from "./drawing/draggable-drawing";

import Vector2D from "./shapes/vector2d";

import Drawer from "./drawer/drawer";
import DrawerOptions from "./drawer/drawer-options";
import Feedback from "./feedback/feedback";
import FeedbackCode from "./feedback/feedback-code";
import FeedbackService from "src/services/feedback";
import FeedbackDispatch from "./feedback/feedback-dispatch";
import { Observer } from "lib/observer/observer";

import AddState from "./actions/add-state";
import AddEdge from "./actions/add-edge";
import AddInitial from "./actions/add-initial";
import DeleteState from "./actions/del-state";
import DeleteEdge from "./actions/del-edge";
import DeleteInitial from "./actions/del-initial";
import EditState from "./actions/edit-state";
import EditEdge from "./actions/edit-edge";

import { ActionManager } from "lib/action-manager/action-manager";
import { HashSet } from "lib/collections/hashset/hash-set";
import { hashString, eqStrings } from "lib/collections/extensions/string-extension";
import Session from "src/services/session";

export default class Editor {
    protected drawer: Drawer;
    protected actionManager: ActionManager;
    protected feedback: Feedback | null;

    public petrinet: Petrinet;
    public graph: Graph;
    public graphDrawing: GraphDrawing;
    public graphDrawingOptions: GraphDrawingOptions;

    public selection: Drawing | null;
    public selectionId: number | null;

    public constructor(canvas: HTMLCanvasElement, petrinet: Petrinet | null = null) {
        this.petrinet = petrinet;
        this.drawer = new Drawer(canvas);
        this.actionManager = new ActionManager();
        this.actionManager.addHook(() => {
            this.drawer.draw();
            FeedbackDispatch.get(this.graph);
        });

        this.selection = null;
        this.selectionId = null;

        this.registerEvents();

        this.graph = new Graph();
        this.graphDrawing = new GraphDrawing();
        this.graphDrawingOptions = new GraphDrawingOptions();
        this.feedback = null;

        let a = new Marking(this.petrinet);
        a.set("p1", new IntegerTokenCount(1));
        a.set("p2", new IntegerTokenCount(5));
        let b = new Marking(this.petrinet);
        b.set("p1", new IntegerTokenCount(1));
        b.set("p2", new OmegaTokenCount());
        let c = new Marking(this.petrinet);
        c.set("p2", new IntegerTokenCount(5));
        c.set("p3", new IntegerTokenCount(1));
        let d = new Marking(this.petrinet);
        d.set("p1", new IntegerTokenCount(3));

        this.addState(a, new Vector2D(50, 100));
        this.addState(b, new Vector2D(420, 100));
        this.addState(c, new Vector2D(420, 250));

        this.addEdge(new Edge(1, 2, "t1"));
        this.addEdge(new Edge(1, 3, "t2"));
        // this.addEdge(new Edge(1, 2, "t3"));
        // this.addEdge(new Edge(1, 1, "t2"));
        // this.addEdge(new Edge(1, 2, "t1"));
        // this.addEdge(new Edge(2, 1, "t1"));
        this.setInitial(1);

        this.drawer.draw(this.graphDrawing);
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
        let a = new AddInitial(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public unsetInitial(id: number): void {
        let a = new DeleteInitial(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public select(pos: Vector2D, context: CanvasRenderingContext2D): void {
        this.selectionId  = this.graphDrawing.getDrawingAt(pos, context);
        this.selection = this.selectionId !== null ?
            this.graphDrawing.getDrawing(this.selectionId) :
            null;
        this.graphDrawingOptions.selected = this.selectionId;
    }

    public setFeedback(feedback: Feedback): void {
        this.feedback = feedback;
        this.graphDrawingOptions.feedback = feedback;
        this.graphDrawing.options = this.graphDrawingOptions;
        this.drawer.draw();
    }

    public setSettings(settings: DrawerOptions) {
        this.drawer.setOptions(settings);
        this.drawer.draw();
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
                case 69: // e
                    if (this.selectionId !== null && 
                        this.graph.hasState(this.selectionId)
                    ) {
                        console.log("editing");
                    }
                case 72: // h
                    // let opts = new HTMLGeneratorOptions();
                    // let tut = new Tutorial(opts);
                    // tut.insert(document.body);
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
            if(event.buttons == 1) {
                let point = this.drawer.globalToLocal(event);
                this.select(point, context!);
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

    public resize() {
        console.log('resizing editor');
        if (this.drawer) {
            this.drawer.resize();
        }
    }

    protected getContainer(): HTMLElement | null {
        return this.drawer.canvas.parentElement;
    }
}

