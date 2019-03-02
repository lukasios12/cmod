import { Graph } from "src/system/graph/graph";
import { Edge } from "src/system/graph/edge";

import { GraphDrawing } from "src/drawing/graph-drawing"
import { EdgeDrawing } from "src/drawing/edge-drawing";

import { UndoableAction } from "lib/action/undoable-action";

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
        let edge = graph.getEdge(id);
        if ( edge !== null ) {
            this.edge = edge;
        } else {
            throw new Error(`Could not delete edge: invalid id: ${this.id}`);
        }
        this.edgeDrawing = drawing.getEdgeDrawing(id);
    }

    public exec(): void {
        console.log(`Deleting edge with id: ${this.id}`);
        this.graph.delEdge(this.id);
        this.graphDrawing.delEdge(this.id);
    }

    public undo(): void {
        console.log(`Undoing deletion of edge with id: ${this.id}`);
        this.graph.addEdge(this.edge, this.id);
        this.graphDrawing.addEdge(this.id, this.edgeDrawing);
    }

    public redo(): void {
        console.log("REDO");
        this.exec();
    }
}

export { DeleteEdge }; 