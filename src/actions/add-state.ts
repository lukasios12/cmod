class AddState implements UndoableAction {
    protected id: number;
    protected state: State;
    protected stateDrawing: StateDrawing;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;
    protected position: Vector2D;

    public constructor(
        state: State,
        graph: Graph,
        graphDrawing: GraphDrawing,
        pos: Vector2D
    ) {
        this.id           = undefined;
        this.state        = state;
        this.stateDrawing = undefined;
        this.graph        = graph;
        this.graphDrawing = graphDrawing;
        this.position     = pos;
    }

    public exec() {
        console.log(`Adding state: ${this.state}`);
        this.id = this.graph.addState(this.state);
        this.stateDrawing = new StateDrawing(this.state, this.position);
        this.graphDrawing.addState(this.id, this.stateDrawing);
    }

    public undo() {
        console.log(`Undoing state addition: ${this.state}. ID: ${this.id}`);
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }

    public redo() {
        console.log(`Redoing state addition: ${this.state}`);
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addState(
            this.id,
            this.stateDrawing
        );
    }
}
