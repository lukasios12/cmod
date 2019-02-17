class Line implements Shape2D {
    public source: Vector2D;
    public target: Vector2D;
    public bend: number;

    public constructor(x1, y1, x2, y2, bend = 0) {
        this.source = new Vector2D(x1, y1);
        this.target = new Vector2D(x2, y2);
        this.bend = bend;
    }

    public stroke(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.stroke();
    }

    public fill(context: CanvasRenderingContext2D) {
        this.stroke(context);
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        context.save();
        context.lineWidth = 20;
        this.preparePath(context);
        let result = context.isPointInStroke(point.x(), point.y());
        context.restore();
        return result;
    }

    public getControlPoint() {
        let vec = Vector2D.sub(this.target, this.source);
        let len = Vector2D.norm(vec);
        let unit = Vector2D.unit(vec);
        let perp = new Vector2D(unit.y(), -unit.x());
        let middle = Vector2D.add(this.source, Vector2D.scale(unit, len / 2));
        let result = Vector2D.add(
            middle,
            Vector2D.scale(perp, this.bend / (0.5 * Math.PI))
        );
        return result;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        let vec = Vector2D.sub(this.target, this.source);
        let len = Vector2D.norm(vec);
        let unit = Vector2D.unit(vec);
        let perp = new Vector2D(unit.y(), -unit.x());
        let middle = Vector2D.add(this.source, Vector2D.scale(unit, len / Math.PI));

        let c = Vector2D.add(middle, Vector2D.scale(perp, this.bend));
        context.moveTo(this.source.x(), this.source.y());
        context.quadraticCurveTo(c.x(), c.y(), this.target.x(), this.target.y());
    }
}
