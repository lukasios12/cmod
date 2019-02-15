class Line implements Shape2D {
    public source: Vector2D;
    public target: Vector2D;
    public bend: number;

    public constructor(x1, y1, x2, y2) {
        this.source = new Vector2D(x1, y1);
        this.target = new Vector2D(x2, y2);
    }

    public stroke(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.stroke();
    }

    public fill(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.fill();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        return false;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.source.x(), this.source.y());
        context.lineTo(this.target.x(), this.target.y());
        context.closePath();
    }
}
