import { Graph } from "src/modeller/system/graph/graph";
import { GraphDrawing } from "src/modeller/drawing/graph-drawing";

import { UndoableAction } from "lib/action/undoable-action";

class DeleteInitial implements UndoableAction {
    protected id: number;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(id: number, graph: Graph, drawing: GraphDrawing) {
        this.id = id;
        this.graph = graph;
        this.graphDrawing = drawing;
    }

    public exec(): void {
        this.graph.initial = null;
        this.graphDrawing.initial = null;
        console.log(this.graph);
    }

    public undo(): void {
        this.graph.initial = this.id;
        this.graphDrawing.initial = this.id;
    }

    public redo(): void {
        this.exec();
    }
}

export { DeleteInitial };
