class Arrow extends Line {
    public width: number;
    public height; number;

    public constructor(x1, y1, x2, y2, w = 15, h = 15) {
        super(x1, y1, x2, y2);
        this.width = w;
        this.height = h;
    }

    public fill(context: CanvasRenderingContext2D) {
        this.preparePath(context);
        context.stroke();
        context.fill();
    }

    protected preparePath(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.source.x(), this.source.y());
        context.lineTo(this.target.x(), this.target.y());

        let angle = 10;

        let w = this.target.x() - this.source.x();
        let h = this.target.y() - this.source.y();
        let rev = new Vector2D(w, h);
        rev = Vector2D.unit(rev);
        let revmat = new Matrix(2, 1);
        revmat.set(0, 0, rev.x());
        revmat.set(1, 0, rev.y());

        let rotmat = new Matrix(2, 2);
        rotmat.set(0, 0, Math.cos(angle));
        rotmat.set(0, 1, -Math.sin(angle));
        rotmat.set(1, 0, Math.sin(angle));
        rotmat.set(1, 1, Math.cos(angle));

        let postrot = Matrix.mult(rotmat, revmat);
        postrot = Matrix.scale(postrot, this.height);
        context.lineTo(
            this.target.x() + postrot.get(0, 0),
            this.target.y() + postrot.get(1, 0)
        );

        rotmat = rotmat.transpose();
        postrot = Matrix.mult(rotmat, revmat);
        postrot = Matrix.scale(postrot, this.height);
        context.lineTo(
            this.target.x() + postrot.get(0, 0),
            this.target.y() + postrot.get(1, 0)
        );

        context.lineTo(this.target.x(), this.target.y());
        context.closePath();
    }
}
