class AddState implements UndoableAction {
    protected state: State;
    protected id: number;
    protected graph: Graph;
    protected drawing: GraphDrawing;
    protected position: Point2D;

    public constructor(state: State, graph: Graph, drawing: GraphDrawing, pos: Point2D) {
        this.state = state;
        this.id = undefined;
        this.graph = graph;
        this.drawing = drawing;
        this.position = pos;
    }

    public exec() {
        console.log(`Adding state: ${this.state}`);
        this.id = this.graph.addState(this.state);
        this.drawing.addState(this.id, this.state, this.position);
    }

    public undo() {
        console.log(`Undoing state addition: ${this.state}`);
        this.graph.delState(this.id);
        this.drawing.delState(this.id);
    }
}
