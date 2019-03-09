import { Graph } from "src/modeller/system/graph/graph"
import { State } from "src/modeller/system/graph/state";

import { GraphDrawing } from "src/modeller/drawing/graph-drawing";

import { UndoableAction } from "lib/action/undoable-action";

class EditState implements UndoableAction {

    protected id: number;
    protected oldState: State | null;
    protected newState: State;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(
        id: number,
        state: State,
        graph: Graph,
        drawing: GraphDrawing
    ) {
        this.id = id;
        this.newState = state;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.oldState = null;
    }

    public exec() {
        this.oldState = this.graph.getState(this.id);
        this.graph.delState(this.id);
        this.graph.addState(this.newState, this.id);
        let drawing = this.graphDrawing.getStateDrawing(this.id);
        drawing.state = this.newState;
    }

    public undo() {
        this.graph.delState(this.id);
        this.graph.addState(this.oldState!, this.id);
        let drawing = this.graphDrawing.getStateDrawing(this.id);
        drawing.state = this.oldState!;
    }

    public redo() {
        this.exec();
    }
}

export { EditState };