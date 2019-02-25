class GraphDrawing implements Drawing, Snappable {
    public states: HashTable<number, StateDrawing>;
    public edges: HashTable<number, EdgeDrawing>;
    public initial: number | null;

    public options: GraphDrawingOptions;

    public constructor(options: GraphDrawingOptions = null) {
        this.states = new HashTable<number, StateDrawing>();
        this.edges = new HashTable<number, EdgeDrawing>();
        this.initial = null;
        this.options = options;
    }

    public draw(context: CanvasRenderingContext2D) {
        let stateIds = this.states.keys();
        let edgeIds = this.edges.keys();
        let drawn = new HashTable<number, boolean>();
        // draw edges
        context.save();
        StyleManager.setEdgeStandardStyle(context);
        let seperation = 80;
        for (let i = 0; i < stateIds.length; i++) {
            let sdrawing = this.states.get(stateIds[i]);
            for (let j = 0; j < stateIds.length; j++) {
                let osdrawing = this.states.get(stateIds[j]);
                let shared = this.edges.keys().filter( (edgeId) => {
                    let edge = this.edges.get(edgeId);
                    return edge instanceof LinearEdgeDrawing && (
                        edge.source == sdrawing && edge.target == osdrawing ||
                        edge.source == osdrawing && edge.target == sdrawing);
                });
                for (let k = 0; k < shared.length; k++) {
                    if(!drawn.get(shared[k])) {
                        let edge = <LinearEdgeDrawing>this.edges.get(shared[k]);
                        let c = 0;
                        if (shared.length > 1) {
                            c = (k * seperation) - ((seperation * (shared.length - 1)) / 2);
                        }
                        if (edge.source == sdrawing) {
                            c = -c;
                        }
                        edge.offset = c;
                        if (this.options.selected == shared[k]) {
                            context.save();
                            StyleManager.setEdgeSelectedStyle(context);
                            edge.draw(context);
                            context.restore();
                        }
                        edge.draw(context);
                        drawn.put(shared[k], true);
                    }
                }
            }
            let loops = edgeIds.filter( (edgeId) => {
                let edge = this.edges.get(edgeId);
                return edge instanceof SelfLoopDrawing &&
                            edge.source == sdrawing;
            });
            for (let i = 0; i < loops.length; i++) {
                let edrawing = this.edges.get(loops[i]);
                if (this.options.selected == loops[i]) {
                    context.save();
                    StyleManager.setEdgeSelectedStyle(context);
                    edrawing.draw(context);
                    context.restore();
                }
                edrawing.draw(context);
            }
        }
        // draw states
        StyleManager.setStateStandardStyle(context);
        for(let i = 0; i < stateIds.length; i++) {
            let sdrawing = this.states.get(stateIds[i]);
            let codes = this.options.feedback.get(stateIds[i]);
            if (codes !== null) {
                context.save();
                let code = codes.toArray().sort()[0];
                StyleManager.setStyle(code, context);
                sdrawing.draw(context);
                context.restore();
            }
            if (this.options.selected == stateIds[i]) {
                context.save();
                StyleManager.setStateSelectedStyle(context);
                sdrawing.draw(context);
                context.restore();
            }
            sdrawing.draw(context);
        }
        context.restore();
        // draw initial state pointer
        if (this.initial != null) {
            context.save();
            context.fillStyle = "black";
            context.strokeStyle = "black";
            context.lineWidth = 2;
            let state = this.getStateDrawing(this.initial);
            let pos = state.position;
            let arrow = new Arrow(pos.x() - 30, pos.y() - 30, pos.x(), pos.y());
            arrow.fill(context);
            context.restore();
        }
    }

    public addState(id: number, drawing: StateDrawing) {
        this.states.put(id, drawing);
        return drawing;
    }

    public addEdge(id: number, edge: EdgeDrawing) {
        this.edges.put(id, edge);
        return edge;
    }

    public delState(id: number) {
        this.states.remove(id);
    }

    public delEdge(id: number) {
        this.edges.remove(id);
    }

    public getDrawing(id: number) {
        let sd = this.getStateDrawing(id);
        if (sd) return sd;
        let ed = this.getEdgeDrawing(id);
        if (ed) return ed;
        return null;
    }

    public getStateDrawing(id: number) {
        if(this.states.hasKey(id)) {
            return this.states.get(id);
        }
        return null;
    }

    public getEdgeDrawing(id: number) {
        if(this.edges.hasKey(id)) {
            return this.edges.get(id);
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
        keys = this.edges.keys();
        for(let i = 0; i < keys.length; i++) {
            if(this.edges.get(keys[i]).hit(pos, context)) {
                return keys[i];
            }
        }
        return null;
    }

    public snap(hgrid: number, vgrid: number) {
        let keys = this.states.keys();
        for(let i = 0; i < keys.length; i++) {
            let state = this.states.get(keys[i]);
            state.snap(hgrid, vgrid);
        }
    }
}
