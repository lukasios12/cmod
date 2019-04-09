import Graph from "src/system/graph/graph";
import State from "src/system/graph/state";
import Edge from "src/system/graph/edge";

import GraphDrawing from "src/drawing/graph-drawing";
import StateDrawing from "src/drawing/state-drawing";
import EdgeDrawing from "src/drawing/edge-drawing";

import { UndoableAction } from "lib/action/undoable-action";
import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

export default class DeleteState implements UndoableAction {
    protected id: number;
    protected state: State;
    protected stateDrawing: StateDrawing;
    protected initial: boolean;
    protected preset: HashTable<number, Edge> | null;
    protected postset: HashTable<number, Edge> | null;
    protected presetDrawings: HashTable<number, EdgeDrawing>;
    protected postsetDrawings: HashTable<number, EdgeDrawing>;
    protected graph: Graph;
    protected graphDrawing: GraphDrawing;

    public constructor(
        id: number,
        graph: Graph,
        drawing: GraphDrawing
    ) {
        this.id = id;
        this.graph = graph;
        this.graphDrawing = drawing;
        this.stateDrawing = this.graphDrawing.getStateDrawing(this.id);
        let state = this.graph.getState(this.id);
        if (state !== null) {
            this.state = state;
        } else {
            throw Error(`Could not construct delete action for state with id: ${id}`);
        }
        this.initial = this.graph.initial === this.id;

        // init variables for restoring edges upon undo
        this.preset = null;
        this.postset = null;
        this.presetDrawings = new HashTable<number, EdgeDrawing>(hashNumber, eqNumbers);
        this.postsetDrawings = new HashTable<number, EdgeDrawing>(hashNumber, eqNumbers);
    }

    public exec(): void {
        console.log(`Removing state with id: ${this.id}`);
        this.preset = this.graph.preset(this.id);
        this.postset = this.graph.postset(this.id);
        console.log(this.preset);
        console.log(this.postset);
        let presetIds = this.preset.keys();
        let postsetIds = this.postset.keys();
        for (let i = 0; i < presetIds.length; i++) {
            let id = presetIds[i];
            let drawing = this.graphDrawing.getEdgeDrawing(id);
            this.presetDrawings.put(id, drawing);
            // delete the edge from the graph and drawing
            this.graph.delEdge(id);
            this.graphDrawing.delEdge(id);
        }
        for (let i = 0; i < postsetIds.length; i++) {
            let id = postsetIds[i];
            let drawing = this.graphDrawing.getEdgeDrawing(id);
            this.postsetDrawings.put(id, drawing);
            // delete the edge from the graph and drawing
            this.graph.delEdge(id);
            this.graphDrawing.delEdge(id);
        }
        if (this.initial) {
            this.graph.initial = null;
            this.graphDrawing.initial = null;
        }
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }

    public undo(): void {
        console.log(`Undoing state removal with id: ${this.id}`);
        if (!this.preset || !this.postset) {
            throw new Error(`Could not restore edges: pre-set and/or post-set undefined`);
        }
        let presetIds = this.preset.keys();
        let postsetIds = this.postset.keys();
        for (let i = 0; i < presetIds.length; i++) {
            let id = presetIds[i];
            this.graph.addEdge(this.preset.get(id)!, id);
            this.graphDrawing.addEdge(id, this.presetDrawings.get(id)!);
        }
        for (let i = 0; i < postsetIds.length; i++) {
            let id = postsetIds[i];
            this.graph.addEdge(this.postset.get(id)!, id);
            this.graphDrawing.addEdge(id, this.postsetDrawings.get(id)!);
        }
        if (this.initial) {
            this.graph.initial = this.id;
            this.graphDrawing.initial = this.id;
        }
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addState(this.id, this.stateDrawing);
    }

    public redo(): void {
        console.log(`Redoing state removal with id: ${this.id}`);
        this.exec();
    }
}
