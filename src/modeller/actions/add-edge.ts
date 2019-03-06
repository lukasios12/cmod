import { Graph } from "src/modeller/system/graph/graph";
import { Edge } from "src/modeller/system/graph/edge";

import { EdgeDrawing } from "src/modeller/drawing/edge-drawing";
import { GraphDrawing } from "src/modeller/drawing/graph-drawing";
import { LinearEdgeDrawing } from "src/modeller/drawing/linear-edge-drawing";
import { SelfLoopDrawing } from "src/modeller/drawing/self-loop-drawing";

import { UndoableAction } from "src/lib/action/undoable-action";

class AddEdge implements UndoableAction {
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
        console.log(`Adding edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.id = this.graph.addEdge(this.edge);
        let drawing;
        if(this.edge.from == this.edge.to) {
            drawing = new SelfLoopDrawing(
                this.graphDrawing.getStateDrawing(this.edge.from),
                this.edge.label
            );
        } else {
            drawing = new LinearEdgeDrawing(
                this.graphDrawing.getStateDrawing(this.edge.from),
                this.graphDrawing.getStateDrawing(this.edge.to),
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
        console.log(`Undoing addition of edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.graph.delEdge(this.id!);
        this.graphDrawing.delEdge(this.id!);
    }

    public redo(): void {
        console.log(`Readding edge (${this.edge.from},${this.edge.to}, ${this.edge.label})`);
        this.graph.addEdge(this.edge, this.id);
        this.graphDrawing.addEdge(this.id!, this.edgeDrawing!);
        console.log(this.graphDrawing);
    }
}

export { AddEdge };