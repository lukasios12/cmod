import Graph from "src/system/graph/graph";
import Edge from "src/system/graph/edge";
import GraphDrawing from "src/drawing/graph-drawing";

import { UndoableAction } from "lib/action/undoable-action";

export default class EditEdge implements UndoableAction {
    protected id: number;
    protected oldEdge: Edge | null;
    protected newEdge: Edge;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(id: number, edge: Edge, graph: Graph, drawing: GraphDrawing) {
        this.id = id;
        this.newEdge = edge;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.oldEdge = null;
    }

    public exec(): void {
        let edge = this.graph.getEdge(this.id);
        if (edge === null) {
            throw new Error(`Could not edit edge: invalid id: ${this.id}`);
        }
        this.oldEdge = edge;
        this.graph.delEdge(this.id);
        this.graph.addEdge(this.newEdge, this.id);
        let edgeDrawing = this.graphDrawing.getEdge(this.id);
        edgeDrawing.edge = this.newEdge;
    }

    public undo(): void {
        this.graph.delEdge(this.id);
        this.graph.addEdge(this.oldEdge, this.id);
        let drawing = this.graphDrawing.getEdge(this.id);
        drawing.edge = this.oldEdge;
    }

    public redo(): void {
        this.exec();
    }
}
