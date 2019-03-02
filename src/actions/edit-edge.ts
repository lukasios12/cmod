import { Graph } from "src/system/graph/graph";
import { GraphDrawing } from "src/drawing/graph-drawing";

import { UndoableAction } from "lib/action/undoable-action";

class EditEdge implements UndoableAction {
    protected id: number;
    protected oldLabel: string | null;
    protected newLabel: string;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(id: number, label: string, graph: Graph, drawing: GraphDrawing) {
        this.id = id;
        this.newLabel = label;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.oldLabel = null;
    }

    public exec(): void {
        let edge = this.graph.getEdge(this.id);
        if (edge === null) {
            throw new Error(`Could not edit edge: invalid id: ${this.id}`);
        }
        this.oldLabel = edge.label;
        edge.label = this.newLabel;
        let edgeDrawing = this.graphDrawing.getEdgeDrawing(this.id);
        edgeDrawing.label = this.newLabel;
    }

    public undo(): void {
        let edge = this.graph.getEdge(this.id);
        if (edge === null) {
            throw new Error(`Could not edit edge: invalid id: ${this.id}`);
        }
        edge.label = this.oldLabel!;
        let edgeDrawing = this.graphDrawing.getEdgeDrawing(this.id);
        edgeDrawing.label = this.oldLabel!;
    }

    public redo(): void {
        this.exec();
    }
}

export { EditEdge };