import EdgeDrawing from "./edge-drawing";
import StateDrawing from "./state-drawing";
import Draggable from "./draggable-drawing";

import Vector2D from "src/shapes/vector2d";
import Circle from "src/shapes/circle";

import StyleManager from "src/stylemanager/style-manager";
import { CanvasRenderingContext2DUtils } from "lib/utils/canvas-rendering-context-2d-utils";

export default class SelfLoopDrawing extends EdgeDrawing implements Draggable {
    protected _angle: number;
    protected _radius: number;

    protected validCache: boolean;
    protected circleCache: Circle | null;

    public constructor(
        state: StateDrawing,
        label: string,
        angle: number = 0,
        radius: number = 20
    ) {
        super(state, label);
        this.angle = angle;
        this.radius = radius;

        this.validCache = false;
        this.circleCache = null;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save();
        let circle = this.getCircle(context);
        circle.stroke(context);
        StyleManager.setEdgeTextStyle(context);
        // draw text
        let fh = CanvasRenderingContext2DUtils.getFontSize(context) + 5;
        let fw = context.measureText(this.label).width + 5;
        let a = this.angle < Math.PI ? -1 : 1;
        let vec = Vector2D.scale(new Vector2D(0, a), this.radius / 2 + fh / 2);
        let p = Vector2D.add(circle.center, vec);
        context.clearRect(p.x - fw / 2, p.y - fh / 2, fw, fh);
        context.fillText(this.label, p.x, p.y);
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

    public getLabelPosition(context: CanvasRenderingContext2D): Vector2D {
        let state = this.source;
        let i = state.getIntersectionAt(this.angle, context);
        let vec = Vector2D.scale(i.vector, i.length + this.radius);
        let p = Vector2D.add(i.origin, vec);
        return p;
    }

    protected getCircle(context: CanvasRenderingContext2D): Circle {
        let circle;
        if(!this.validCache  || !this.circleCache || !this.connectionsValid) {
            context.save();
            StyleManager.setEdgeStandardStyle(context);
            let state = this.source;
            let i = state.getIntersectionAt(this.angle, context);
            let vec = Vector2D.scale(i.vector, i.length + this.radius / 2);
            let p = Vector2D.add(i.origin, vec);
            circle = new Circle(p.x, p.y, this.radius);
            this.circleCache = circle;
            this.validCache = true;
            this.connectionsValid = true;
            context.restore();
        } else {
            circle = this.circleCache;
        }
        return circle;
    }

    get angle() {
        return this._angle;
    }

    set angle(a: number) {
        this._angle = a;
        this.validCache = false;
    }

    get radius() {
        return this._radius;
    }

    set radius(r: number) {
        this._radius = r;
        this.validCache = false;
    }
}

