import { Shape2D } from "./shape2d";
import { Vector2D } from "./vector2d";

class Rectangle implements Shape2D {
    public source: Vector2D;
    public width: number;
    public height: number;

    public constructor(x: number, y: number, w: number, h: number) {
        this.source = new Vector2D(x, y);
        this.width = w;
        this.height = h;
    }

    public stroke(context: CanvasRenderingContext2D): void {
        context.strokeRect(this.source.x(), this.source.y(), this.width, this.height);
    }

    public fill(context: CanvasRenderingContext2D): void {
        context.fillRect(this.source.x(), this.source.y(), this.width, this.height);
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D): boolean {
        context.save();
        context.lineWidth = 20;
        this.preparePath(context);
        let result = context.isPointInPath(point.x(), point.y());
        context.restore();
        return result;
    }

    protected preparePath(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.rect(this.source.x(), this.source.y(), this.width, this.height);
    }
}

export { Rectangle };