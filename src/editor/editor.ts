import Petrinet from "src/system/petrinet/petrinet";
import Graph from "src/system/graph/graph";
import State from "src/system/graph/state";
import Edge from "src/system/graph/edge";
import Marking from "src/system/marking";

import Drawing from "src/drawing/drawing";
import GraphDrawing from "src/drawing/graph-drawing";
import GraphDrawingOptions from "src/drawing/graph-drawing-options";
import { isDraggable } from "src/drawing/draggable-drawing";

import Vector2D from "src/shapes/vector2d";

import Drawer from "src/drawer/drawer";
import DrawerOptions from "src/drawer/drawer-options";
import Feedback from "src/feedback/feedback";
import FeedbackDispatch from "src/feedback/feedback-dispatch";

import AddState from "src/actions/add-state";
import AddEdge from "src/actions/add-edge";
import AddInitial from "src/actions/add-initial";
import DeleteState from "src/actions/del-state";
import DeleteEdge from "src/actions/del-edge";
import DeleteInitial from "src/actions/del-initial";
import EditState from "src/actions/edit-state";
import EditEdge from "src/actions/edit-edge";

import { ActionManager } from "lib/action-manager/action-manager";

export default class Editor {
    protected _drawer: Drawer;
    protected actionManager: ActionManager;
    protected _feedback: Feedback | null;

    public petrinet: Petrinet;
    public graph: Graph;
    public graphDrawing: GraphDrawing;
    protected _graphDrawingOptions: GraphDrawingOptions;

    public selection: Drawing | null;
    public selectionId: number | null;

    public hoverId: number | null;

    public constructor(canvas: HTMLCanvasElement, petrinet: Petrinet | null = null) {
        this.petrinet = petrinet;
        this._drawer = new Drawer(canvas);
        this.actionManager = new ActionManager();
        this.actionManager.addHook(() => {
            this.drawer.draw();
            FeedbackDispatch.get(this.graph);
        });

        this.selection = null;
        this.selectionId = null;
        this.hoverId = null;

        this.registerEvents();

        this.graph = new Graph();
        this.graphDrawingOptions = {
            selected: null,
            feedback: null,
        };
        this.graphDrawing = new GraphDrawing(this.graphDrawingOptions);
        this.feedback = null;

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
        if (this.graph.hasState(id)) {
            let current = this.graph.getState(id);
            if (!Marking.equals(current, state)) {
                let a = new EditState(id, state, this.graph, this.graphDrawing);
                this.actionManager.exec(a);
            }
        }
    }

    public editEdge(id: number, label: string): void {
        if (this.graph.hasEdge(id)) {
            let current = this.graph.getEdge(id).label;
            if (current !== label) {
                let a = new EditEdge(id, label, this.graph, this.graphDrawing);
                this.actionManager.exec(a);
            }
        }
    }

    public setInitial(id: number): void {
        let a = new AddInitial(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
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
        this.drawer.draw();
    }

    get feedback() {
        return this._feedback;
    }

    set feedback(f: Feedback) {
        this._feedback = f;
        this.graphDrawingOptions.feedback = f;
        this.graphDrawing.options = this.graphDrawingOptions;
        this.drawer.draw(this.graphDrawing);
    }

    set drawerOptions(opts: DrawerOptions) {
        this.drawer.options = opts;
    }

    get graphDrawingOptions() {
        return this._graphDrawingOptions;
    }

    set graphDrawingOptions(opts: GraphDrawingOptions) {
        this._graphDrawingOptions = opts;
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
                case 65: // a
                    let state = new Marking(this.petrinet);
                    this.addState(state);
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
        let mouseDownLeft = false;
        canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();
            switch(event.buttons) {
                case 1: // left click
                    let point = this.drawer.globalToLocal(event);
                    if (this.selectionId !== null && event.ctrlKey) {
                        let id = this.graphDrawing.getDrawingAt(point, context);
                        if (id !== null) {
                            let transitions = this.petrinet.transitions.toArray();
                            let edge = new Edge(this.selectionId, id, transitions[0]);
                            this.addEdge(edge);
                        } else {
                            this.select(point, context);
                        }
                    } else {
                        this.select(point, context);
                    }
                    mouseDownLeft = true;
                    break;
                case 2: // right click
                    point = this.drawer.globalToLocal(event);
                    this.select(point, context);
                    break;
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            if (mouseDownLeft && !event.ctrlKey &&
                this.selection && isDraggable(this.selection)) {
                let point = this.drawer.globalToLocal(event);
                this.selection.drag(point, context!);
                this.hoverId = null;
                this.drawer.draw();
            } else if (!mouseDownLeft) {
                let point = this.drawer.globalToLocal(event);
                this.hoverId = this.graphDrawing.getDrawingAt(point, context);
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            mouseDownLeft = false;
            this.drawer.draw();
        });
        
        canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }

    public resize() {
        if (this.drawer) {
            this.drawer.resize();
        }
    }

    get drawer() {
        return this._drawer;
    }

    get clientRect() {
        if (this.drawer) {
            return this.drawer.canvas.getBoundingClientRect();
        }
        return null;
    }    
}
