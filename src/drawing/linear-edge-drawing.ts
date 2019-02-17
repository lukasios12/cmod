class LinearEdgeDrawing extends EdgeDrawing {
    public target: StateDrawing;
    public offset: number;

    public constructor(source: StateDrawing, target: StateDrawing, label: string) {
        super(source, label);
        this.target = target;
        this.offset = 0;
    }

    public draw(context: CanvasRenderingContext2D) {
        let c1 = this.source.center(context);
        let c2 = this.target.center(context);
        let arrow = new Arrow(c1.x(), c1.y(), c2.x(), c2.y(), 30);
        arrow.fill(context);
    }
}
