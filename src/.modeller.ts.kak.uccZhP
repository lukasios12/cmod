/// <reference path='./drawer/index.ts'/>
/// <reference path='./drawing/index.ts'/>
/// <reference path='./system/index.ts'/>
/// <reference path='./feedback/index.ts'/>

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

    public constructor(canvas: HTMLCanvasElement, petrinet: Petrinet = null) {
        this.drawer = new Drawer(canvas);
        this.actionManager = new ActionManager();
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

        let a = Matrix.identity(3);
        a.set(0,2,-2);
        a.set(1,2,-1);
        let b = new Matrix(3, 1);
        b.set(0,0,17);
        b.set(1,0,10);
        b.set(2,0,1);
        let r = Matrix.mult(a, b);
        console.log(r);

        this.graph = new Graph();
        this.graphDrawing = new GraphDrawing();
        this.graphDrawingOptions = new GraphDrawingOptions();
        let feedback = new Feedback();
        feedback.add(FeedbackCode.REACHABLE_FROM_PRESET, 0);
        this.setFeedback(feedback);

        let s = new Marking(this.petrinet);
        s.set("p1", new IntegerTokenCount(1));

        this.addState(s);
        this.drawer.draw(this.graphDrawing);
    }

    public addState(state: State, position: Point2D = null) {
        let id = this.graph.addState(state);
        this.graphDrawing.addState(id, state, position);
    }

    public addEdge(edge: Edge) {
        let id = this.graph.addEdge(edge);
        this.graphDrawing.addEdge(id, edge);
    }

    public delState(id: number) {
        this.graph.delState(id);
        this.graphDrawing.delState(id);
    }

    public delEdge(id: number) {
        this.graph.delEdge(id);
        this.graphDrawing.delEdge(id);
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
        canvas.addEventListener("click", (event) => {
            let point = new Point2D(event.clientX, event.clientY);
            let tpoint = this.drawer.globalToLocal(point);
            context.fillRect(tpoint.x, tpoint.y, 10, 10);
        });
    }
}
