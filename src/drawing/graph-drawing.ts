import GraphDrawingOptions from "./graph-drawing-options";

import Drawing           from "./drawing";
import Snappable         from "./snappable-drawing";
import EdgeDrawing       from "./edge-drawing";
import StateDrawing      from "./state-drawing";
import LinearEdgeDrawing from "./linear-edge-drawing";
import SelfLoopDrawing   from "./self-loop-drawing";

import Arrow    from "src/shapes/arrow";
import Vector2D from "src/vector/vector2d";

import { MarkingStringType } from "src/system/marking";
import StyleManager          from "src/style-manager/style-manager";

import HashTable from "src/hash-table/hash-table";
import HashSet   from "src/hash-set/hash-set";

export default class GraphDrawing implements Drawing, Snappable {
    public states: HashTable<number, StateDrawing>;
    public edges: HashTable<number, EdgeDrawing>;
    public initial: number | null;

    public _options: GraphDrawingOptions;

    public constructor(options: GraphDrawingOptions | null = null) {
        this.states = new HashTable<number, StateDrawing>();
        this.edges = new HashTable<number, EdgeDrawing>();
        this.initial = null;
        if(options) { 
            this.options = options;
        } else {
            this.options = {
                selected: null,
                feedback: null,
                markingStyle: MarkingStringType.FULL,
            };
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        console.log("graph drawing", this.options);
        let drawn = new HashSet<number>();
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
                context.save();
                let shared = this.edges.filterValues((edge) => {
                    return edge instanceof LinearEdgeDrawing && (
                           edge.source == sdrawing && edge.target == osdrawing ||
                           edge.source == osdrawing && edge.target == sdrawing);
                });
                let k = 0;
                shared.each((id: number, edge: LinearEdgeDrawing) => {
                    if(!drawn.contains(id)) {
                        let c = 0;
                        if (shared.size > 1) {
                            c = (k * seperation) - ((seperation * (shared.size - 1)) / 2);
                        }
                        if (edge.source == sdrawing) {
                            c = -c;
                        }
                        edge.offset! = c;
                        if(feedback) {
                            let record = feedback.get(id);
                            if (record !== null && !record.isEmpty()) {
                                let code = record.highest;
                                StyleManager.setStyle(code, context);
                                edge.draw(context);
                            }
                        }
                        if (selected == id) {
                            StyleManager.setEdgeSelectedStyle(context);
                            edge.draw(context);
                        }
                    }
                    k++;
                });
                context.restore();
                shared.each((id: number, edge: LinearEdgeDrawing) => {
                    if (!drawn.contains(id)) {
                        edge.draw(context);
                        drawn.add(id);
                    }
                });
            });
            this.edges.each((id: number, edge: EdgeDrawing) => {
                if (edge instanceof SelfLoopDrawing && edge.source == sdrawing) {
                    if (feedback) {
                        let record = feedback.get(id);
                        if (record !== null && !record.isEmpty()) {
                            context.save();
                            let code = record.highest;
                            StyleManager.setStyle(code, context);
                            edge.draw(context);
                            context.restore();
                        }
                    }
                    if (selected == id) {
                        context.save();
                        StyleManager.setEdgeSelectedStyle(context);
                        edge.draw(context);
                        context.restore();
                    }
                    edge.draw(context);
                }

            });
        });
        // draw states
        StyleManager.setStateStandardStyle(context);
        this.states.each((id: number, state: StateDrawing) => {
            state.markingStyle = this.options.markingStyle;
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

    public snap(hgrid: number, vgrid: number, context: CanvasRenderingContext2D): void {
        context.save();
        StyleManager.setStateStandardStyle(context);
        this.states.each((id: number, state: StateDrawing) => {
            state.snap(hgrid, vgrid, context);
        });
        context.restore();
    }

    public get options() {
        return this._options;
    }

    public set options(opts: GraphDrawingOptions) {
        this._options = opts;
    }
}
