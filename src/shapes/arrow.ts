class Arrow {
    public source: Vector2D;
    public target: Vector2D;
    public bend: number;
    public width: number;
    public height; number;

    public constructor(x1, y1, x2, y2, b = 0, w = 15, h = 15) {
        this.source = new Vector2D(x1, y1);
        this.target = new Vector2D(x2, y2);
        this.bend = b;
        this.width = w;
        this.height = h;
    }

    public stroke(context: CanvasRenderingContext2D) {
        let line = this.getLine();
        line.stroke(context);
        let tip = this.getTip();
        tip.stroke(context);
    }

    public fill(context: CanvasRenderingContext2D) {
        let line = this.getLine();
        line.stroke(context);
        let tip = this.getTip();
        tip.fill(context);
    }

    protected getLine() {
        let rev = Vector2D.unit(Vector2D.sub(this.source, this.target));
        let d = Vector2D.add(this.target, Vector2D.scale(rev, this.height));
        let line = new Line(this.source.x(), this.source.y(),
                            d.x(), d.y(),
                            this.bend);
        return line;
    }

    protected getTip() {
        let a = new Vector2D(this.target.x(), this.target.y());
        let rev = Vector2D.unit(Vector2D.sub(this.source, a));
        let perp = new Vector2D(rev.y(), -rev.x());
        let d = Vector2D.add(this.target, Vector2D.scale(rev, this.height));
        let b = Vector2D.add(d, Vector2D.scale(perp, this.width / 2));
        let c = Vector2D.sub(d, Vector2D.scale(perp, this.width / 2));
        let triangle = new Triangle(a.x(), a.y(),
                                    b.x(), b.y(),
                                    c.x(), c.y());
        return triangle;
    }
}
