import { Petrinet } from "src/system/petrinet/petrinet";
import { Graph } from "src/system/graph/graph";
import { State } from "src/system/graph/state";
import { Edge } from "src/system/graph/edge";
import { Marking } from "src/system/marking";
import { IntegerTokenCount } from "src/system/tokens/integer-token-count";
import { OmegaTokenCount } from "src/system/tokens/omega-token-count";

import { Drawing } from "src/drawing/drawing";
import { GraphDrawing } from "src/drawing/graph-drawing";
import { GraphDrawingOptions } from "src/drawing/graph-drawing-options";
import { isDraggable } from "src/drawing/draggable_drawing";

import { Vector2D } from "src/shapes/vector2d";

import { Drawer } from "src/drawer/drawer";
import { Feedback } from "src/feedback/feedback";
import { FeedbackCode } from "src/feedback/feedback-code";

import { AddState } from "src/actions/add-state";
import { AddEdge } from "src/actions/add-edge";
import { AddInitial } from "src/actions/add-initial";
import { DeleteState } from "src/actions/del-state";
import { DeleteEdge } from "src/actions/del-edge";
import { DeleteInitial } from "src/actions/del-initial";
import { EditState } from "src/actions/edit-state";
import { EditEdge } from "src/actions/edit-edge";


import { ActionManager } from "lib/action-manager/action-manager";
import { HashSet } from "lib/collections/hashset/hash-set";
import { hashString, eqStrings } from "lib/collections/extensions/string-extension";

class Modeller {
    protected drawer: Drawer;
    protected actionManager: ActionManager;
    protected feedback: Feedback;

    public petrinet: Petrinet;
    public graph: Graph;
    public graphDrawing: GraphDrawing;
    public graphDrawingOptions: GraphDrawingOptions;

    public selection: Drawing | null;
    public selectionId: number | null;

    public constructor(canvas: HTMLCanvasElement, petrinet: Petrinet | null = null) {
        this.drawer = new Drawer(canvas, {
            minZoom: 1, maxZoom: 10,
            minX: -20, maxX: 20,
            minY: -200, maxY: 200,
            gridOptions: {
                drawGrid: true,
                snapGrid: true,
                horizontalGridSeperation: 50,
                verticalGridSeperation: 50
            }
        });
        this.actionManager = new ActionManager();
        this.actionManager.addHook( () => {
            this.drawer.draw();
        });

        this.selection = null;
        this.selectionId = null;

        this.registerEvents();

        let places = new HashSet<string>(hashString, eqStrings);
        places.add("p1");
        places.add("p2");
        places.add("p3");
        places.add("p4");
        let transitions = new HashSet<string>(hashString, eqStrings);
        transitions.add("t1");
        transitions.add("t2");
        transitions.add("t3");
        transitions.add("t4");
        this.petrinet = new Petrinet(places, transitions);

        this.graph = new Graph();
        this.graphDrawing = new GraphDrawing();
        this.graphDrawingOptions = new GraphDrawingOptions();
        let feedback = new Feedback();
        feedback.add(FeedbackCode.REACHABLE_FROM_PRESET, 1);
        feedback.add(FeedbackCode.DUPLICATE_STATE, 2);
        feedback.add(FeedbackCode.DISABLED, 3);
        feedback.add(FeedbackCode.DUPLICATE_EDGE, 4);
        feedback.add(FeedbackCode.ENABLED_CORRECT_POST, 4);
        feedback.add(FeedbackCode.ENABLED_CORRECT_POST, 5);
        // feedback.add(FeedbackCode.DUPLICATE_EDGE, 6);
        this.feedback = feedback;
        this.setFeedback(feedback);

        let a = new Marking(this.petrinet);
        a.set("p1", new IntegerTokenCount(1));
        let b = new Marking(this.petrinet);
        b.set("p2", new IntegerTokenCount(2));
        let c = new Marking(this.petrinet);
        c.set("p3", new OmegaTokenCount());
        let d = new Marking(this.petrinet);
        d.set("p1", new IntegerTokenCount(3));

        this.addState(a, new Vector2D(50, 100));
        this.addState(b, new Vector2D(420, 100));
        this.addEdge(new Edge(1, 2, "t3"));
        this.addEdge(new Edge(1, 1, "t2"));
        // this.addEdge(new Edge(1, 2, "t1"));
        this.addEdge(new Edge(2, 1, "t1"));
        this.setInitial(1);

        this.editEdge(4, "test");
        this.editState(1, c);

        this.drawer.draw(this.graphDrawing);

        // let menu = new EditEdgeMenu(1, this.petrinet);
        // menu.insert(document.body);
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
        console.log(this.selectionId);
    }

    public setFeedback(feedback: Feedback): void {
        this.feedback = feedback;
        this.graphDrawingOptions.feedback = feedback;
        this.graphDrawing.options = this.graphDrawingOptions;
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
                case 72: // h
                    // let tut = new TutorialMenu();
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
                this.select(new Vector2D(event.clientX, event.clientY), context!);
                mouseDownLeft= true;
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            if(mouseDownLeft && this.selection && isDraggable(this.selection)) {
                let pos = this.drawer.globalToLocal(
                    new Vector2D(event.clientX, event.clientY)
                );
                this.selection.drag(pos, context!);
                this.drawer.draw();
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            mouseDownLeft = false;
            this.drawer.draw();
        });
    }
}

export { Modeller }; 