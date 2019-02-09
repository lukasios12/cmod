class Triangle implements Shape2D {
    public alpha: Point2D;
    public beta: Point2D;
    public gamma: Point2D;

    public constructor(x1, y1, x2, y2, x3, y3) {
        this.alpha = new Point2D(x1, y1);
        this.beta = new Point2D(x2, y2);
        this.gamma = new Point2D(x3, y3);
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

    protected preparePath(context:CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.alpha.x, this.alpha.y);
        context.lineTo(this.beta.x , this.beta.y);
        context.lineTo(this.gamma.x, this.gamma.y);
        context.closePath();
    }
}
