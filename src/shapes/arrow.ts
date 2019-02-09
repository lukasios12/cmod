class Arrow extends Line {
    public width: number;
    public height; number;

    public constructor(x1, y1, x2, y2, w = 10, h = 10) {
        super(x1, y1, x2, y2);
        this.width = w;
        this.height = h;
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.source.x(), this.source.y());
        context.lineTo(this.target.x(), this.target.y());
        context.closePath();
    }
}
