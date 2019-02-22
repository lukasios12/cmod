class DeleteState implements UndoableAction {
    protected id: number;
    protected state: State;
    protected stateDrawing: StateDrawing;
    protected initial: boolean;
    protected preset: HashTable<number, Edge>;
    protected postset: HashTable<number, Edge>
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
        this.state = this.graph.getState(this.id);
        this.initial = this.graph.getInitial() === this.id;

        // init variables for restoring edges upon undo
        this.preset = undefined;
        this.postset = undefined;
        this.presetDrawings = new HashTable<number, EdgeDrawing>();
        this.postsetDrawings = new HashTable<number, EdgeDrawing>();
    }

    public exec() {
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
            this.graph.setInitial(null);
            this.graphDrawing.initial = null;
        }
        this.graph.delState(this.id);
        this.graphDrawing.delState(this.id);
    }

    public undo() {
        console.log(`Undoing state removal with id: ${this.id}`);
        let presetIds = this.preset.keys();
        let postsetIds = this.postset.keys();
        for (let i = 0; i < presetIds.length; i++) {
            let id = presetIds[i];
            this.graph.addEdge(this.preset.get(id), id);
            this.graphDrawing.addEdge(id, this.presetDrawings.get(id));
        }
        for (let i = 0; i < postsetIds.length; i++) {
            let id = postsetIds[i];
            this.graph.addEdge(this.postset.get(id), id);
            this.graphDrawing.addEdge(id, this.postsetDrawings.get(id));
        }
        if (this.initial) {
            this.graph.setInitial(this.id);
            this.graphDrawing.initial = this.id;
        }
        this.graph.addState(this.state, this.id);
        this.graphDrawing.addState(this.id, this.stateDrawing);
    }

    public redo() {
        console.log(`Redoing state removal with id: ${this.id}`);
        this.exec();
    }
}
