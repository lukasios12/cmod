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
            StyleManager.setStateStandardStyle(context);
            state.draw(context);
        }
    }

    public addState(id: number, state: State, position: Point2D = null) {
        let drawing = new StateDrawing(state, position);
        this.states.put(id, drawing);
    }

    public addEdge(id: number, edge: Edge) {
        let drawing = new EdgeDrawing(edge);
        this.edges.put(id, drawing);
    }

    public delState(id: number) {
        this.states.remove(id);
    }

    public delEdge(id: number) {
        this.edges.remove(id);
    }

    public getStateDrawing(pos: Point2D, context: CanvasRenderingContext2D) {
        let keys = this.states.keys();
        for(let i = 0; i < keys.length; i++) {
            if(this.states.get(keys[i]).hit(pos, context)) {
                return this.states.get(keys[i]);
            }
        }
        return null;
    }

    public getEdgeDrawing(pos: Point2D, context: CanvasRenderingContext2D) {

    }

    public getSelfloopDrawing(pos: Point2D, context: CanvasRenderingContext2D) {

    }
}
