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

import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension";

export default class GraphDrawing implements Drawing, Snappable {
    public states: HashTable<number, StateDrawing>;
    public edges: HashTable<number, EdgeDrawing>;
    public initial: number | null;

    public options: GraphDrawingOptions;

    public constructor(options: GraphDrawingOptions | null = null) {
        this.states = new HashTable<number, StateDrawing>(hashNumber, eqNumbers);
        this.edges = new HashTable<number, EdgeDrawing>(hashNumber, eqNumbers);
        this.initial = null;
        if(options) { 
            this.options = options;
        } else {
            this.options = new GraphDrawingOptions(null, null);
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        let stateIds = this.states.keys();
        let edgeIds = this.edges.keys();
        let drawn = new HashTable<number, boolean>(hashNumber, eqNumbers);
        
        let selected = this.options.selected;
        // let feedback = this.options.feedback;
        
        // draw feedback borders for states
        // for(let i = 0; i < stateIds.length; i++) {
        //     let sdrawing = this.states.get(stateIds[i]);
            // if (feedback !== null) {
            //     let codes = feedback.get(stateIds[i]);
            //     if (codes !== null && !codes.isEmpty()) {
            //         context.save();
            //         let code = codes.toArray().sort()[codes.length() - 1];
            //         StyleManager.setStyle(code, context);
            //         sdrawing!.draw(context);
            //         context.restore();
            //     }
            // }
        // }
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
                        // if(feedback) {
                        //     let codes = feedback.get(shared[k]);
                        //     if (codes !== null && !codes.isEmpty()) {
                        //         context.save();
                        //         let code = codes.toArray().sort()[codes.length() - 1];
                        //         StyleManager.setStyle(code, context);
                        //         edge.draw(context);
                        //         context.restore();
                        //     }
                        // }
                        if (selected == shared[k]) {
                            context.save();
                            StyleManager.setEdgeSelectedStyle(context);
                            edge.draw(context);
                            context.restore();
                        }
                    }
                }
                for (let k = 0; k < shared.length; k++) {
                    let edge = <LinearEdgeDrawing>this.edges.get(shared[k]);
                    if(!drawn.get(shared[k])) {
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
                // if (feedback) {
                //     let codes = feedback.get(loops[i]);
                //     if (codes !== null && !codes.isEmpty()) {
                //         context.save();
                //         let code = codes.toArray().sort()[codes.length() - 1];
                //         StyleManager.setStyle(code, context);
                //         edrawing!.draw(context);
                //         context.restore();
                //     } 
                // }
                if (selected == loops[i]) {
                    context.save();
                    StyleManager.setEdgeSelectedStyle(context);
                    edrawing!.draw(context);
                    context.restore();
                }
                edrawing!.draw(context);
            }
        }
        // draw states
        StyleManager.setStateStandardStyle(context);
        for(let i = 0; i < stateIds.length; i++) {
            let sdrawing = this.states.get(stateIds[i]);
            if (selected == stateIds[i]) {
                context.save();
                StyleManager.setStateSelectedStyle(context);
                sdrawing!.draw(context);
                context.restore();
            }
            sdrawing!.draw(context);
        }
        StyleManager.setEdgeTextStyle(context);
        for(let i = 0; i < edgeIds.length; i++) {
            this.getEdge(edgeIds[i]).drawText(context);
        }
        context.restore();
        // draw initial state pointer
        if (this.initial != null) {
            context.save();
            context.fillStyle = "black";
            context.strokeStyle = "black";
            context.lineWidth = 2;
            let state = this.getState(this.initial);
            let pos = state!.position;
            let arrow = new Arrow(pos.x - 30, pos.y - 30, pos.x, pos.y);
            arrow.fill(context);
            context.restore();
        }
    }

    public addState(id: number, drawing: StateDrawing): StateDrawing {
        this.states.put(id, drawing);
        let pre = this.preset(id);
        let post = this.postset(id);
        drawing.preset = pre;
        drawing.postset = post;
        return drawing;
    }

    public addEdge(id: number, edge: EdgeDrawing): EdgeDrawing {
        this.edges.put(id, edge);
        let stateKeys = this.states.keys();
        for(let i = 0; i < stateKeys.length; i++) {
            let state = this.states.get(stateKeys[i]);
            if (edge.source === state) {
                state.postset.push(edge);
            } else if (edge instanceof LinearEdgeDrawing &&
                       edge.target === state) {
                state.preset.push(edge);
            }
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
        if(this.states.hasKey(id)) {
            return this.getState(id);
        } 
        if(this.edges.hasKey(id)) {
            return this.getEdge(id);
        }
        return null;
    }

    public getState(id: number): StateDrawing {
        if(this.states.hasKey(id)) {
            return this.states.get(id)!;
        }
        return null;
    }

    public getEdge(id: number): EdgeDrawing {
        if(this.edges.hasKey(id)) {
            return this.edges.get(id)!;
        }
        return null;
    }

    public getDrawingAt(pos: Vector2D, context: CanvasRenderingContext2D): number | null {
        let keys = this.states.keys();
        for(let i = 0; i < keys.length; i++) {
            if(this.states.get(keys[i])!.hit(pos, context)) {
                return keys[i];
            }
        }
        keys = this.edges.keys();
        for(let i = 0; i < keys.length; i++) {
            if(this.edges.get(keys[i])!.hit(pos, context)) {
                return keys[i];
            }
        }
        return null;
    }

    public snap(hgrid: number, vgrid: number): void {
        let keys = this.states.keys();
        for(let i = 0; i < keys.length; i++) {
            let state = this.states.get(keys[i]);
            state!.snap(hgrid, vgrid);
        }
    }

    public preset(id: number): Array<EdgeDrawing> {
        if (!this.states.hasKey(id)) {
            throw new Error(`could not determine preset for state with id ${id}`);
        }
        let result = new Array<EdgeDrawing>();
        let state = this.states.get(id);
        let edgeKeys = this.edges.keys();
        for(let i = 0; i < edgeKeys.length; i++) {
            let edge = this.edges.get(edgeKeys[i]);
            if (edge instanceof LinearEdgeDrawing && edge.source === state) {
                result.push(edge);
            }
        }
        return result;
    }

    public postset(id: number): Array<EdgeDrawing> {
        if (!this.states.hasKey(id)) {
            throw new Error(`could not determine postset for state with id ${id}`);
        }
        let result = new Array<EdgeDrawing>();
        let state = this.states.get(id);
        let edgeKeys = this.edges.keys();
        for(let i = 0; i < edgeKeys.length; i++) {
            let edge = this.edges.get(edgeKeys[i]);
            if (edge.source === state) {
                result.push(edge);
            }
        }
        return result;
    }
}
