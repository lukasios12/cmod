import Graph from "src/editor/system/graph/graph";
import GraphDrawing from "src/editor/drawing/graph-drawing";

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
        console.log(`Setting initial state with id: ${this.id}`);
        this.graph.initial = this.id;
        this.graphDrawing.initial = this.id;
    }

    public undo(): void {
        console.log(`Undoing initial state setting of state with id: ${this.id}`);
        this.graph.initial = null;
        this.graphDrawing.initial = null;
    }

    public redo(): void {
        console.log(`Redoing initial state setting of state with id: ${this.id}`);
        this.exec();
    }
}