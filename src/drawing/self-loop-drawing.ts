class SelfLoopDrawing extends EdgeDrawing implements Draggable {
    public angle: number;
    public radius: number;

    public constructor(
        state: StateDrawing,
        label: string,
        angle: number = 0,
        radius: number = 30
    ) {
        super(state, label);
        this.angle = angle;
        this.radius = radius;
    }

    public draw(context: CanvasRenderingContext2D) {
        console.log("drawing selfloop");
        context.save();
        context.beginPath();
        let cir = new Circle(this.source.position.x(), this.source.position.y(), this.radius);
        cir.stroke(context);
        context.closePath();
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        let center;
    }

    public drag(point: Vector2D, context: CanvasRenderingContext2D) {
        return;
    }
}
