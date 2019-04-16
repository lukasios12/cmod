import StateDrawing from "./state-drawing";
import Hittable from "./hittable-drawing";

import Vector2D from "src/shapes/vector2d";

export default abstract class EdgeDrawing implements Hittable {
    public source: StateDrawing;
    public label: string;

    public connectionsValid: boolean;

    public constructor(source: StateDrawing, label: string) {
        this.label = label;
        this.source = source;
        this.connectionsValid = false;
    }

    public abstract draw(context:CanvasRenderingContext2D): void;

    public abstract hit(point: Vector2D, context: CanvasRenderingContext2D): boolean;

    public abstract getLabelPosition(context: CanvasRenderingContext2D);
}
