class SelfLoopDrawing implements Drawing {
    public state: StateDrawing;
    public label: string;
    public angle: number;

    public constructor(state: StateDrawing, label: string, angle: number = 0) {
        this.state = state;
        this.label = label;
        this.angle = angle;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        let cir = new Circle(this.state.position.x(), this.state.position.y(), 40);
        cir.stroke(context);
        context.restore();
    }
}
