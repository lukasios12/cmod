class AddState implements UndoableAction {
    protected id: number;
    protected state: State;
    protected stateDrawing: StateDrawing;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;
    protected position: Point2D;

    public constructor(
        state: State,
        graph: Graph,
        graphDrawing: GraphDrawing,
        pos: Point2D
    ) {
        this.id = undefined;
        this.state = state;
        this.stateDrawing = undefined;
        this.graph = graph;
        this.graphDrawing = graphDrawing;
        this.position = pos;
    }

    public exec() {
        console.log(`Adding state: ${this.state}`);
        this.id = this.graph.addState(this.state);
        this.stateDrawing = this.graphDrawing.addState(
            this.id,
            this.state,
            this.position
        );
    }

    public undo() {
        console.log(`Undoing state addition: ${this.state}`);
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }

    public redo() {
        console.log(`Redoing state addition: ${this.state}`);
        this.id = this.graph.addState(this.state);
        this.graphDrawing.addStateDrawing(
            this.id,
            this.stateDrawing
        );
    }
}
