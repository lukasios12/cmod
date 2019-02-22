class EditEdge implements UndoableAction {
    protected id: number;
    protected oldLabel: string;
    protected newLabel: string;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(id, label, graph, drawing) {
        this.id = id;
        //this.oldLabel = old;
        this.newLabel = label;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec() {
        let edge = this.graph.getEdge(this.id);
        this.oldLabel = edge.label;
        edge.label = this.newLabel;
        let edgeDrawing = this.graphDrawing.getEdgeDrawing(this.id);
        edgeDrawing.label = this.newLabel;
    }

    public undo() {
        let edge = this.graph.getEdge(this.id);
        edge.label = this.oldLabel;
        let edgeDrawing = this.graphDrawing.getEdgeDrawing(this.id);
        edgeDrawing.label = this.oldLabel;
    }

    public redo() {
        this.exec();
    }
}
