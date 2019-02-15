class DeleteEdge implements UndoableAction {
    protected id: number;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;
    protected edge: Edge;
    protected edgeDrawing: EdgeDrawing;

    public constructor(id: number, graph: Graph, drawing: GraphDrawing) {
        this.id = id;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.edge = graph.getEdge(id);
        this.edgeDrawing = drawing.getEdgeDrawing(id);
    }

    public exec() {
        console.log(`Deleting edge with id: ${this.id}`);
        this.graph.delEdge(this.id);
        this.graphDrawing.delEdge(this.id);
    }

    public undo() {
        console.log(`Undoing deletion of edge with id: ${this.id}`);
        this.graph.addEdge(this.edge, this.id);
        this.graphDrawing.addEdge(this.id, this.edgeDrawing);
    }

    public redo() {
        console.log("REDO");
        this.exec();
    }
}
