class Rectangle implements Shape2D {
    public source: Vector2D;
    public width: number;
    public height: number;

    public constructor(x, y, w, h) {
        this.source = new Vector2D(x, y);
        this.width = w;
        this.height = h;
    }

    public stroke(context: CanvasRenderingContext2D) {
        context.strokeRect(this.source.x(), this.source.y(), this.width, this.height);
    }

    public fill(context: CanvasRenderingContext2D) {
        context.fillRect(this.source.x(), this.source.y(), this.width, this.height);
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        return false;
    }
}
