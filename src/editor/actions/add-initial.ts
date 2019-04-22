import Graph from "src/system/graph/graph";
import GraphDrawing from "src/drawing/graph-drawing";

import { UndoableAction } from "lib/action/undoable-action";

export default class AddInitial implements UndoableAction {
    protected id: number;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(stateId: number, graph: Graph, drawing: GraphDrawing) {
        this.id = stateId;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec(): void {
        this.graph.initial = this.id;
        this.graphDrawing.initial = this.id;
    }

    public undo(): void {
        this.graph.initial = null;
        this.graphDrawing.initial = null;
    }

    public redo(): void {
        this.exec();
    }
}
