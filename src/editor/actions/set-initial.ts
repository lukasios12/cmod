import Graph from "src/system/graph/graph";
import GraphDrawing from "src/drawing/graph-drawing";

import UndoableAction from "src/action/undoable-action";

export default class SetInitial implements UndoableAction {
    protected id: number | null;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    protected oldId = null;

    public constructor(stateId: number | null, graph: Graph, drawing: GraphDrawing) {
        this.id = stateId;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec(): void {
        this.oldId = this.graph.initial;
        this.graph.initial = this.id;
        this.graphDrawing.initial = this.id;
    }

    public undo(): void {
        this.graph.initial = this.oldId;
        this.graphDrawing.initial = this.oldId;
    }

    public redo(): void {
        this.exec();
    }
}
