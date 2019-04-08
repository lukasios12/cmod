import EdgeDrawing from "./edge-drawing";
import StateDrawing from "./state-drawing";

import Vector2D from "src/editor/shapes/vector2d";
import Arrow from "src/editor/shapes/arrow";

import StyleManager from "src/editor/stylemanager/style-manager";
import { CanvasRenderingContext2DUtils } from "lib/utils/canvas-rendering-context-2d-utils";

export default class LinearEdgeDrawing extends EdgeDrawing {
    public target: StateDrawing;
    public offset: number;

    public constructor(source: StateDrawing, target: StateDrawing, label: string) {
        super(source, label);
        this.target = target;
        this.offset = 0;
    }

    public draw(context: CanvasRenderingContext2D): void {
        // draw arrow
        let arrow = this.getArrow(context);
        arrow.fill(context);
        // draw label
        let point = arrow.getControlPoint();
        let lwidth = context.measureText(this.label).width + 5;
        let lheight = CanvasRenderingContext2DUtils.getFontSize(context) * 1.5;
        context.save();
        StyleManager.setEdgeTextStyle(context);
        context.clearRect(point.x - lwidth / 2, point.y - lheight / 2,
                          lwidth, lheight);
        // context.strokeRect(point.x - lwidth / 2, point.y - lheight / 2,
        //                   lwidth, lheight);
        context.fillText(this.label, point.x, point.y);
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D): boolean {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let arrow = this.getArrow(context);
        let result = arrow.hit(point, context);
        context.restore();
        return result;
    }

    protected getArrow(context: CanvasRenderingContext2D): Arrow {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let c1 = this.source.center(context);
        let c2 = this.target.center(context);
        // determine start (source) point
        let intersection = this.source.getIntersection(c2, context);
        let p1 = Vector2D.add(c1,Vector2D.scale(intersection.vector, intersection.length));
        // determine end (target) point
        intersection = this.target.getIntersection(c1, context);
        let vec = Vector2D.scale(intersection.vector, intersection.length);
        let p2 = Vector2D.add(c2, vec);
        context.restore();
        let arrow = new Arrow(p1.x, p1.y, p2.x, p2.y, this.offset);
        return arrow;
    }
}
