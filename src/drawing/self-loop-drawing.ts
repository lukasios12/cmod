import EdgeDrawing from "./edge-drawing";
import StateDrawing from "./state-drawing";
import Draggable from "./draggable-drawing";

import Vector2D from "src/shapes/vector2d";
import Circle from "src/shapes/circle";

import StyleManager from "src/stylemanager/style-manager";
import { CanvasRenderingContext2DUtils } from "lib/utils/canvas-rendering-context-2d-utils";

export default class SelfLoopDrawing extends EdgeDrawing implements Draggable {
    public angle: number;
    public radius: number;

    public constructor(
        state: StateDrawing,
        label: string,
        angle: number = 0,
        radius: number = 20
    ) {
        super(state, label);
        this.angle = angle;
        this.radius = radius;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save();
        // draw circle
        context.beginPath();
        let state = this.source;
        let i = state.getIntersectionAt(this.angle, context);
        let vec = Vector2D.scale(i.vector, i.length + this.radius / 2);
        let p = Vector2D.add(i.origin, vec);
        context.arc(p.x, p.x, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        StyleManager.setEdgeTextStyle(context);
        // draw text
        let fh = CanvasRenderingContext2DUtils.getFontSize(context) + 5;
        let fw = context.measureText(this.label).width + 5;
        let a = this.angle < Math.PI ? -1 : 1;
        vec = Vector2D.scale(new Vector2D(0, a), this.radius / 2 + fh / 2);
        p = Vector2D.add(p, vec);
        context.clearRect(p.x - fw / 2, p.x - fh / 2, fw, fh);
        context.fillText(this.label, p.x, p.x);
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D): boolean {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let circle = this.getCircle(context);
        let result = circle.hit(point, context);
        context.restore();
        return result;
    }

    public drag(point: Vector2D, context: CanvasRenderingContext2D): void {
        let angle = Vector2D.angle(this.source.center(context), point);
        this.angle = angle;
    }

    protected getCircle(context: CanvasRenderingContext2D): Circle {
        context.save();
        StyleManager.setEdgeStandardStyle(context);
        let state = this.source;
        let i = state.getIntersectionAt(this.angle, context);
        let vec = Vector2D.scale(i.vector, i.length + this.radius);
        let p = Vector2D.add(i.origin, vec);
        let circle = new Circle(p.x, p.x, this.radius);
        context.restore();
        return circle;
    }
}

