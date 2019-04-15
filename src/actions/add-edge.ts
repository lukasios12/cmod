import Graph from "src/system/graph/graph";
import Edge from "src/system/graph/edge";

import EdgeDrawing from "src/drawing/edge-drawing";
import GraphDrawing from "src/drawing/graph-drawing";
import LinearEdgeDrawing from "src/drawing/linear-edge-drawing";
import SelfLoopDrawing from "src/drawing/self-loop-drawing";

import { UndoableAction } from "lib/action/undoable-action";

export default class AddEdge implements UndoableAction {
    protected id: number | null;
    protected edge: Edge;
    protected edgeDrawing: EdgeDrawing | null;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(edge: Edge, graph: Graph, drawing: GraphDrawing) {
        this.edge = edge;
        this.graph = graph;
        this.graphDrawing = drawing;

        this.id = null;
        this.edgeDrawing = null;
    }

    public exec(): void {
        this.id = this.graph.addEdge(this.edge);
        let drawing;
        if(this.edge.from == this.edge.to) {
            drawing = new SelfLoopDrawing(
                this.graphDrawing.getState(this.edge.from),
                this.edge.label
            );
        } else {
            drawing = new LinearEdgeDrawing(
                this.graphDrawing.getState(this.edge.from),
                this.graphDrawing.getState(this.edge.to),
                this.edge.label
            );
        }
        this.graphDrawing.addEdge(this.id, drawing);
        if(this.graphDrawing.options.selected === this.id) {
            this.graphDrawing.options.selected = null;
        }

        this.edgeDrawing = drawing;
    }

    public undo(): void {
        this.graph.delEdge(this.id!);
        this.graphDrawing.delEdge(this.id!);
    }

    public redo(): void {
        this.graph.addEdge(this.edge, this.id);
        this.graphDrawing.addEdge(this.id!, this.edgeDrawing!);
    }
}
