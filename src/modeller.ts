/// <reference path='./actions/index.ts'/>
/// <reference path='./drawer/index.ts'/>
/// <reference path='./drawing/index.ts'/>
/// <reference path='./system/index.ts'/>
/// <reference path='./feedback/index.ts'/>
/// <reference path='./shapes/index.ts'/>

/// <reference path='../lib/action-manager/index.ts'/>
/// <reference path='../lib/matrix/matrix.ts'/>

class Modeller {
    protected drawer: Drawer;
    protected actionManager: ActionManager;
    protected feedback: Feedback;

    public petrinet: Petrinet;
    public graph: Graph;
    public graphDrawing: GraphDrawing;
    public graphDrawingOptions: GraphDrawingOptions;

    public selection: Drawing;
    public selectionId: number;

    public constructor(canvas: HTMLCanvasElement, petrinet: Petrinet = null) {
        this.drawer = new Drawer(canvas);
        this.actionManager = new ActionManager();
        this.actionManager.addHook( () => {
            this.drawer.draw();
        });
        this.registerEvents();

        let places = new HashSet<string>();
        places.add("p1");
        places.add("p2");
        places.add("p3");
        places.add("p4");
        let transitions = new HashSet<string>();
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
        this.setFeedback(feedback);

        let a = new Marking(this.petrinet);
        a.set("p1", new IntegerTokenCount(1));
        let b = new Marking(this.petrinet);
        b.set("p2", new IntegerTokenCount(2));

        let ab = new Edge(1, 2, "t1");

        this.addState(a);
        this.addState(b);
        this.addEdge(ab);
        this.delEdge(3);
        this.setInitial(1);

        console.log(this.graph);
        console.log(this.graphDrawing);

        this.drawer.draw(this.graphDrawing);
    }

    public addState(state: State, position: Vector2D = null) {
        let a = new AddState(state, this.graph, this.graphDrawing, position);
        this.actionManager.exec(a);
    }

    public addEdge(edge: Edge) {
        let a = new AddEdge(edge, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public delState(id: number) {
        let a = new DeleteState(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public delEdge(id: number) {
        let a = new DeleteEdge(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public setInitial(id: number) {
        let a = new AddInitial(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public unsetInitial(id: number) {
        let a = new DeleteInitial(id, this.graph, this.graphDrawing);
        this.actionManager.exec(a);
    }

    public select(pos: Vector2D, context: CanvasRenderingContext2D) {
        this.selectionId  = this.graphDrawing.getDrawingAt(pos, context);
        this.selection = this.selectionId !== null ?
            this.graphDrawing.getStateDrawing(this.selectionId) :
            null;
        this.graphDrawingOptions.selected = this.selectionId;
        console.log(this.selectionId);
    }

    public setFeedback(feedback: Feedback) {
        this.feedback = feedback;
        this.graphDrawingOptions.feedback = feedback;
        this.graphDrawing.options = this.graphDrawingOptions;
    }

    protected registerEvents() {
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
                    this.delState(this.selectionId);
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
                this.select(new Vector2D(event.clientX, event.clientY), context);
                mouseDownLeft= true;
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            if(mouseDownLeft && this.selection && isDraggable(this.selection)) {
                let pos = this.drawer.globalToLocal(
                    new Vector2D(event.clientX, event.clientY)
                );
                this.selection.drag(pos, context);
                this.drawer.draw();
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            mouseDownLeft = false;
            this.drawer.draw();
        });
    }
}
