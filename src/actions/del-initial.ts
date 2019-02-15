class DeleteInitial implements UndoableAction {
    protected id: number;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(id: number, graph: Graph, drawing: GraphDrawing) {
        this.id = id;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec() {
        this.graph.setInitial(null);
        this.graphDrawing.initial = null;
        console.log(this.graph);
    }

    public undo() {
        this.graph.setInitial(this.id);
        this.graphDrawing.initial = this.id;
    }

    public redo() {
        this.exec();
    }
}
