class Circle implements Shape2D {
    public center: Point2D;
    public radius: number;
    public rotation: number;

    public constructor(x, y, r, rot = 2 * Math.PI) {
        this.center = new Point2D(x, y);
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

    public hit(pos: Point2D, context: CanvasRenderingContext2D) {
        let centerVec = Point2D.toVector(this.center);
        let posVec    = Point2D.toVector(pos);
        let distVec   = Vector.sub(posVec, centerVec);
        console.log(centerVec, posVec, distVec);
        return Math.abs(Vector.norm(distVec)) <= this.radius;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.arc(this.center.x,
                    this.center.y,
                    this.radius,
                    0,
                    this.rotation
        );
    }
}
