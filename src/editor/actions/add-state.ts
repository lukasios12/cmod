import Graph from "src/system/graph/graph";
import State from "src/system/graph/state";

import GraphDrawing from "src/drawing/graph-drawing"
import StateDrawing from "src/drawing/state-drawing";

import Vector2D from "src/vector/vector2d";

import UndoableAction from "src/action/undoable-action";

export default class AddState implements UndoableAction {
    protected id: number | null;
    protected state: State;
    protected stateDrawing: StateDrawing | null;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;
    protected position: Vector2D | null;

    public constructor(
        state: State,
        graph: Graph,
        graphDrawing: GraphDrawing,
        pos: Vector2D | null
    ) {
        this.id           = null;
        this.state        = state;
        this.stateDrawing = null;
        this.graph        = graph;
        this.graphDrawing = graphDrawing;
        this.position     = pos;
    }

    public exec(): void {
        this.id = this.graph.addState(this.state);
        this.stateDrawing = new StateDrawing(
            this.state,
            this.graphDrawing.options.markingStyle,
            this.position
        );
        this.graphDrawing.addState(this.id, this.stateDrawing);
    }

    public undo(): void {
        this.graph.delState(this.id!);
        this.graphDrawing.delState(this.id!);
    }

    public redo(): void {
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addState(
            this.id!,
            this.stateDrawing!
        );
    }
}

