class GraphDrawing implements Drawing {
    public initial: number;
    public states: HashTable<number, StateDrawing>;
    public edges: HashTable<number, EdgeDrawing>;

    public options: GraphDrawingOptions;

    public constructor(options: GraphDrawingOptions = null) {
        this.states = new HashTable<number, StateDrawing>();
        this.edges = new HashTable<number, EdgeDrawing>();
        this.initial = null;
        this.options = options;
    }

    public draw(context: CanvasRenderingContext2D) {
        let states = this.states;
        let edges = this.edges;
        let stateIds = states.keys();
        let edgeIds = edges.keys();

        for(let i = 0; i < stateIds.length; i++) {
            let state = states.get(stateIds[i]);
            let codes = this.options.feedback.get(stateIds[i]);
            if(codes !== null) {
                let codeArray = codes.toArray();
                codeArray.sort().reverse();
                StyleManager.setStyle(codeArray[0], context);
                state.draw(context);
            }

            if (this.options.selected === stateIds[i]) {
                StyleManager.setStateSelectedStyle(context);
                state.draw(context);
            }
            StyleManager.setStateStandardStyle(context);
            state.draw(context);
        }
    }

    public addState(id: number, state: State, position: Vector2D = null) {
        let drawing = new StateDrawing(state, position);
        this.states.put(id, drawing);
        return drawing;
    }

    public addEdge(id: number, edge: Edge) {
        let drawing = new EdgeDrawing(edge);
        this.edges.put(id, drawing);
        return drawing;
    }

    public delState(id: number) {
        this.states.remove(id);
    }

    public delEdge(id: number) {
        this.edges.remove(id);
    }

    public addStateDrawing(id: number, drawing: StateDrawing) {
        this.states.put(id, drawing);
        return drawing;
    }

    public addEdgeDrawing(id: number, drawing: EdgeDrawing) {
        this.edges.put(id, drawing);
        return drawing;
    }

    public getStateDrawing(id: number) {
        if(this.states.hasKey(id)) {
            return this.states.get(id);
        }
        return null;
    }

    public getDrawingAt(pos: Vector2D, context: CanvasRenderingContext2D) {
        let keys = this.states.keys();
        for(let i = 0; i < keys.length; i++) {
            if(this.states.get(keys[i]).hit(pos, context)) {
                return keys[i];
            }
        }
        return null;
    }

    public getEdgeDrawing(pos: Vector2D, context: CanvasRenderingContext2D) {

    }

    public getSelfloopDrawing(pos: Vector2D, context: CanvasRenderingContext2D) {

    }
}
