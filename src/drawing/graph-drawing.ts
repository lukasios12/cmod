import GraphDrawingOptions from "./graph-drawing-options";

import Drawing from "./drawing";
import Snappable from "./snappable-drawing";
import EdgeDrawing from "./edge-drawing";
import StateDrawing from "./state-drawing";
import LinearEdgeDrawing from "./linear-edge-drawing";
import SelfLoopDrawing from "./self-loop-drawing";

import Arrow from "src/shapes/arrow";
import Vector2D from "src/shapes/vector2d";

import StyleManager from "src/stylemanager/style-manager";

import HashTable from "src/hash-table/hash-table";

export default class GraphDrawing implements Drawing, Snappable {
    public states: HashTable<number, StateDrawing>;
    public edges: HashTable<number, EdgeDrawing>;
    public initial: number | null;

    public options: GraphDrawingOptions;

    public constructor(options: GraphDrawingOptions | null = null) {
        this.states = new HashTable<number, StateDrawing>();
        this.edges = new HashTable<number, EdgeDrawing>();
        this.initial = null;
        if(options) { 
            this.options = options;
        } else {
            this.options = new GraphDrawingOptions(null, null);
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        let drawn = new HashTable<number, boolean>();
        
        let selected = this.options.selected;
        let feedback = this.options.feedback;
        
        // draw feedback borders for states
        this.states.each((id: number, state: StateDrawing) => {
            if (feedback !== null) {
                let record = feedback.get(id);
                if (record !== null && record.codes.size > 0) {
                    let code = record.highest;
                    StyleManager.setStyle(code, context);
                    state!.draw(context);
                }
            }
        });
        // draw edges
        context.save();
        StyleManager.setEdgeStandardStyle(context);
        let seperation = 80;
        this.states.each((id: number, sdrawing: StateDrawing) => {
            this.states.each((id: number, osdrawing: StateDrawing) => {
                let shared = new Array<number>();
                context.save();
                this.edges.each((id: number, edge: EdgeDrawing) => {
                    if (edge instanceof LinearEdgeDrawing && (
                        edge.source == sdrawing && edge.target == osdrawing ||
                        edge.source == osdrawing && edge.target == sdrawing)) {
                        shared.push(id);
                    }
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
                        if(feedback) {
                            let record = feedback.get(shared[k]);
                            if (record !== null && !record.isEmpty()) {
                                let code = record.highest;
                                StyleManager.setStyle(code, context);
                                edge.draw(context);
                            }
                        }
                        if (selected == shared[k]) {
                            StyleManager.setEdgeSelectedStyle(context);
                            edge.draw(context);
                        }
                    }
                }
                context.restore();
                for (let k = 0; k < shared.length; k++) {
                    let edge = <LinearEdgeDrawing>this.edges.get(shared[k]);
                    if(!drawn.get(shared[k])) {
                        edge.draw(context);
                        drawn.set(shared[k], true);
                    }
                }
            });
            let loops = new Array<number>();
            this.edges.each((id: number, edge: EdgeDrawing) => {
                if (edge instanceof SelfLoopDrawing && edge.source == sdrawing) {
                    loops.push(id);
                }
            });
            for (let i = 0; i < loops.length; i++) {
                let edrawing = this.edges.get(loops[i]);
                if (feedback) {
                    let record = feedback.get(loops[i]);
                    if (record !== null && !record.isEmpty()) {
                        context.save();
                        let code = record.highest;
                        StyleManager.setStyle(code, context);
                        edrawing!.draw(context);
                        context.restore();
                    } 
                }
                if (selected == loops[i]) {
                    context.save();
                    StyleManager.setEdgeSelectedStyle(context);
                    edrawing!.draw(context);
                    context.restore();
                }
                edrawing!.draw(context);
            }
        });
        // draw states
        StyleManager.setStateStandardStyle(context);
        this.states.each((id: number, state: StateDrawing) => {
            if (selected == id) {
                context.save();
                StyleManager.setStateSelectedStyle(context);
                state!.draw(context);
                context.restore();
            }
            state!.draw(context);
        });
        // draw text for states and edges
        StyleManager.setStateTextStyle(context);
        this.states.each((id: number, state: StateDrawing) => {
            state.drawText(context);
        });
        StyleManager.setEdgeTextStyle(context);
        this.edges.each((id: number, edge: EdgeDrawing) => {
            edge.drawText(context);
        });
        context.restore();
        // draw initial state pointer
        if (this.initial != null) {
            context.fillStyle = "black";
            context.strokeStyle = "black";
            context.lineWidth = 2;
            let state = this.getState(this.initial);
            let pos = state!.position;
            let arrow = new Arrow(pos.x - 30, pos.y - 30, pos.x, pos.y);
            arrow.fill(context);
        }
    }

    public addState(id: number, drawing: StateDrawing): StateDrawing {
        this.states.set(id, drawing);
        return drawing;
    }

    public addEdge(id: number, edge: EdgeDrawing): EdgeDrawing {
        this.edges.set(id, edge);
        let e = edge.edge;
        let source = this.getState(e.from);
        source.postset.push(edge);
        if (e.from !== e.to) {
            let target = this.getState(e.to);
            target.preset.push(edge);
        }
        return edge;
    }

    public delState(id: number): void {
        this.states.remove(id);
    }

    public delEdge(id: number): void {
        this.edges.remove(id);
    }

    public getDrawing(id: number): Drawing {
        if(this.states.has(id)) {
            return this.getState(id);
        } 
        if(this.edges.has(id)) {
            return this.getEdge(id);
        }
        return null;
    }

    public getState(id: number): StateDrawing {
        if(this.states.has(id)) {
            return this.states.get(id)!;
        }
        return null;
    }

    public getEdge(id: number): EdgeDrawing {
        if(this.edges.has(id)) {
            return this.edges.get(id)!;
        }
        return null;
    }

    public getDrawingAt(pos: Vector2D, context: CanvasRenderingContext2D): number | null {
        let result = null;
        this.states.each((id: number, state: StateDrawing) => {
            if (state.hit(pos, context)) {
                result = id;
                return;
            }
        });
        if (result !== null) return result;
        this.edges.each((id: number, edge: EdgeDrawing) => {
            if (edge.hit(pos, context)) {
                result = id;
                return;
            }
        });
        return result;
    }

    public snap(hgrid: number, vgrid: number): void {
        this.states.each((id: number, state: StateDrawing) => {
            state.snap(hgrid, vgrid);
        });
    }
}
