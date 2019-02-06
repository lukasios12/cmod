class Line implements Shape2D {
    public source: Point2D;
    public target: Point2D;

    public constructor(x1, y1, x2, y2) {
        this.source = new Point2D(x1, y1);
        this.target = new Point2D(x2, y2);
    }

    public stroke(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.stroke();
    }

    public fill(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.fill();
    }

    public hit(point: Point2D, context: CanvasRenderingContext2D) {
        return false;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.source.x, this.source.y);
        context.lineTo(this.target.x, this.target.y);
    }
}
