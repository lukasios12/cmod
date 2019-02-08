class AddEdge implements UndoableAction {
    protected id: number;
    protected edge: Edge;
    protected edgeDrawing: EdgeDrawing;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(edge: Edge, graph: Graph, drawing: GraphDrawing) {
        this.edge = edge;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec() {
        console.log(`Adding edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.id = this.graph.addEdge(this.edge);
        this.edgeDrawing = this.graphDrawing.addEdge(this.id, this.edge);
    }

    public undo() {
        console.log(`Undoing addition of edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.graph.delEdge(this.id);
        this.graphDrawing.delEdge(this.id);
    }

    public redo() {
        console.log(`Readding edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.graph.addEdge(this.edge, this.id);
        this.graphDrawing.addEdgeDrawing(this.id, this.edgeDrawing);
    }
}
