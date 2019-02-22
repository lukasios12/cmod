class SelfLoopDrawing extends EdgeDrawing implements Draggable {
    public angle: number;
    public radius: number;

    public constructor(
        state: StateDrawing,
        label: string,
        angle: number = 0,
        radius: number = 20
    ) {
        super(state, label);
        this.angle = angle;
        this.radius = radius;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        // draw circle
        context.beginPath();
        let state = this.source;
        let i = state.getIntersectionAt(this.angle, context);
        let vec = Vector2D.scale(i.vector, i.length + this.radius / 2);
        let p = Vector2D.add(i.origin, vec);
        context.arc(p.x(), p.y(), this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        StyleManager.setEdgeTextStyle(context);
        // draw text
        let fh = CanvasRenderingContext2DUtils.getFontSize(context) + 5;
        let fw = context.measureText(this.label).width + 5;
        // vec = Vector2D.scale(i.vector, i.length + this.radius + fh / 2);
        let a = this.angle < Math.PI ? -1 : 1;
        vec = Vector2D.scale(new Vector2D(0, a), this.radius / 2 + fh / 2);
        p = Vector2D.add(p, vec);
        context.clearRect(p.x() - fw / 2, p.y() - fh / 2, fw, fh);
        context.fillText(this.label, p.x(), p.y());
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        context.save();
        let state = this.source;
        let i = state.getIntersectionAt(this.angle, context);
        let vec = Vector2D.scale(i.vector, i.length + this.radius / 2);
        let p = Vector2D.add(i.origin, vec);
        let v = Vector2D.sub(point, p);
        let result = Vector2D.norm(v) <= this.radius + 10;
        context.restore();
        return result;
    }

    public drag(point: Vector2D, context: CanvasRenderingContext2D) {
        let angle = Vector2D.angle(this.source.center(context), point);
        this.angle = angle;
    }
}
