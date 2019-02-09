class LinearEdgeDrawing implements Drawing{
    public from: StateDrawing;
    public to: StateDrawing;
    public label: string;
    public offset: number;

    public constructor(from: StateDrawing, to: StateDrawing, label: string) {
        this.from = from;
        this.to = to;
        this.label = label;
        this.offset = 0;
    }

    public draw(context: CanvasRenderingContext2D) {
        console.log("drawing line");
        let c1 = this.from.center(context);
        let c2 = this.to.center(context);
        let line = new Arrow(c1.x(), c1.y(), c2.x(), c2.y());
        line.stroke(context);
    }
}
