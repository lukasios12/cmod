import Hittable from "./hittable-drawing";
import Snappable from "./snappable-drawing";
import Draggable from "./draggable-drawing";

import State from "src/editor/system/graph/state";

import Vector2D from "src/editor/shapes/vector2d";
import Rectangle from "src/editor/shapes/rectangle";
import Intersection from "src/editor/shapes/intersection";

import StyleManager from "src/editor/stylemanager/style-manager";
import { CanvasRenderingContext2DUtils } from "lib/utils/canvas-rendering-context-2d-utils";

export default class StateDrawing implements Hittable, Draggable, Snappable {
    public state: State;
    public position: Vector2D;

    public constructor(state: State, position: Vector2D | null = null) {
        this.state = state;
        if(position) {
            this.position = position;
        } else {
            this.position = new Vector2D(0, 0);
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save();
        let text = this.getStateString();
        let box = this.getBox(context);
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        box.fill(context);
        box.stroke(context);
        StyleManager.setStateTextStyle(context);
        context.fillText(
            text,
            this.position.x() + width / 2,
            this.position.y() + height / 2
        );
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D): boolean {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let box = this.getBox(context);
        let result = box.hit(point, context);
        context.restore();
        return result;
    }

    public drag(point: Vector2D, context: CanvasRenderingContext2D): void {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let newPos = new Vector2D(point.x() - (width / 2), point.y() - (height / 2));
        this.position = newPos;
        context.restore();
    }

    public snap(hgrid: number, vgrid: number): void {
        let x = Math.round(this.position.x() / hgrid) * hgrid;
        let y = Math.round(this.position.y() / vgrid) * vgrid;
        this.position = new Vector2D(x, y);
    }

    public center(context:CanvasRenderingContext2D): Vector2D {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let vector = new Vector2D(this.position.x(), this.position.y());
        let wh = new Vector2D(this.getWidth(context) / 2, this.getHeight(context) / 2);
        context.restore();
        return Vector2D.add(vector, wh);
    }

    protected getBox(context: CanvasRenderingContext2D): Rectangle {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let box = new Rectangle(this.position.x(),
                                this.position.y(),
                                width,
                                height);
        context.restore();
        return box;
    }

    public getIntersection(p: Vector2D, context: CanvasRenderingContext2D): Intersection {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let center = this.center(context);
        let angle = Vector2D.angle(center, p);
        let result = this.getIntersectionAt(angle, context);
        context.restore();
        return result;
    }

    public getIntersectionAt(angle: number, context: CanvasRenderingContext2D): Intersection {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let center = this.center(context);
        // determine the angles for the four corners
        let tl = Vector2D.angle(center, this.position);
        let br = tl + Math.PI;
        let tr = Math.PI - tl;
        let bl = tr + Math.PI;
        let w = 0, h = 0;
        let aangle = Math.abs(angle);
        if (aangle == 0.5 * Math.PI || aangle == 1.5 * Math.PI) { // vert
            h = this.getHeight(context) / 2;
            if (angle > Math.PI) {
                h = -h;
            }
        } else if (aangle == Math.PI || aangle == 0) { // hori
            w = this.getWidth(context) / 2;
            if (angle == Math.PI) {
                w = -w;
            }
        } else {
            if (angle >= tr && angle <= tl) {
                h = this.getHeight(context) / 2;
                w = h / Math.tan(angle);
            } else if (angle >= bl && angle <= br) {
                h = -(this.getHeight(context) / 2);
                w = h / Math.tan(angle);
            } else if (angle >= tl && angle <= bl) {
                w = -this.getWidth(context) / 2;
                h = (w * Math.tan(angle));
            } else if (angle >= br || angle <= tr) {
                w = this.getWidth(context) / 2;
                h = w * Math.tan(angle);
            }
        }
        let l = Math.sqrt(w * w + h * h);
        let origin = center;
        let vector = Vector2D.unit(new Vector2D(w, -h));
        let result = new Intersection(origin, vector, l);
        context.restore();
        return result;
    }

    public getHeight(context: CanvasRenderingContext2D): number {
        let fontsize = CanvasRenderingContext2DUtils.getFontSize(context);
        return 1.5 * fontsize;
    }

    public getWidth(context: CanvasRenderingContext2D): number {
        return context.measureText(this.getStateString()).width + 10;
    }

    protected getStateString() {
        return `[${this.state.toString()}]`;
    }
}

