import { Graph } from "src/system/graph/graph";
import { State } from "src/system/graph/state";

import { GraphDrawing } from "src/drawing/graph-drawing"
import { StateDrawing } from "src/drawing/state-drawing";

import { Vector2D } from "src/shapes/vector2d";

import { UndoableAction } from "lib/action/undoable-action";

class AddState implements UndoableAction {
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
        console.log(`Adding state: ${this.state}`);
        this.id = this.graph.addState(this.state);
        this.stateDrawing = new StateDrawing(this.state, this.position);
        this.graphDrawing.addState(this.id, this.stateDrawing);
    }

    public undo(): void {
        console.log(`Undoing state addition: ${this.state}. ID: ${this.id}`);
        this.graph.delState(this.id!);
        this.graphDrawing.delState(this.id!);
    }

    public redo(): void {
        console.log(`Redoing state addition: ${this.state}`);
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addState(
            this.id!,
            this.stateDrawing!
        );
    }
}

export { AddState };