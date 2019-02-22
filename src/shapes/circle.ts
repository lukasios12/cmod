class Circle implements Shape2D {
    public center: Vector2D;
    public radius: number;
    public rotation: number;

    public constructor(x, y, r, rot = 2 * Math.PI) {
        this.center = new Vector2D(x, y);
        this.radius = r;
        this.rotation = rot;
    }

    public stroke(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.stroke();
    }

    public fill(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.fill();
    }

    public hit(pos: Vector2D, context: CanvasRenderingContext2D) {
        context.save();
        context.lineWidth = 20;
        this.preparePath(context);
        let result = context.isPointInPath(pos.x(), pos.y());
        context.restore();
        return result;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.center.x(),
                    this.center.y(),
                    this.radius,
                    0,
                    this.rotation
        );
    }
}
