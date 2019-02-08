class DeleteState implements UndoableAction {
    protected id: number;
    protected state: State;
    protected stateDrawing: StateDrawing;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(
        id: number,
        graph: Graph,
        drawing: GraphDrawing
    ) {
        this.id = id;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.stateDrawing = this.graphDrawing.getStateDrawing(this.id);
        this.state = this.graph.getState(this.id);
    }

    public exec() {
        console.log(`Removing state with id: ${this.id}`);
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }

    public undo() {
        console.log(`Undoing state removal with id: ${this.id}`);
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addStateDrawing(this.id, this.stateDrawing);
    }

    public redo() {
        console.log(`Redoing state removal with id: ${this.id}`);
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }
}
