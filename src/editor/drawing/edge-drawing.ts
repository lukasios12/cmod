import StateDrawing from "./state-drawing";
import Hittable from "./hittable-drawing";

import Vector2D from "src/editor/shapes/vector2d";

export default abstract class EdgeDrawing implements Hittable {
    public source: StateDrawing;
    public label: string;

    public constructor(source: StateDrawing, label: string) {
        this.label = label;
        this.source = source;
    }

    public abstract draw(context:CanvasRenderingContext2D): void;

    public abstract hit(point: Vector2D, context: CanvasRenderingContext2D): boolean;
}