class LinearEdgeDrawing extends EdgeDrawing {
    public target: StateDrawing;
    public offset: number;

    public constructor(source: StateDrawing, target: StateDrawing, label: string) {
        super(source, label);
        this.target = target;
        this.offset = 0;
    }

    public draw(context: CanvasRenderingContext2D) {
        // draw arrow
        let arrow = this.getArrow(context);
        arrow.fill(context);
        // draw label
        let point = arrow.getControlPoint();
        let lwidth = context.measureText(this.label).width + 5;
        let lheight = CanvasRenderingContext2DUtils.getFontSize(context) * 1.5;
        context.save();
        StyleManager.setEdgeTextStyle(context);
        context.clearRect(point.x() - lwidth / 2, point.y() - lheight / 2,
                          lwidth, lheight);
        // context.strokeRect(point.x() - lwidth / 2, point.y() - lheight / 2,
        //                   lwidth, lheight);
        context.fillText(this.label, point.x(), point.y());
        context.restore();
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let arrow = this.getArrow(context);
        context.restore();
        return arrow.hit(point, context);
    }

    protected getArrow(context: CanvasRenderingContext2D) {
        context.save();
        StyleManager.setStateStandardStyle(context);
        let c1 = this.source.center(context);
        let c2 = this.target.center(context);
        let angle = Vector2D.angle(c1, c2);

        // determine start (source) point
        let tl = Vector2D.angle(c1, this.source.position);
        let br = tl + Math.PI;
        let tr = Math.PI - tl;
        let bl = Math.PI + tr;
        let w, k, l = 0;
        if (Math.abs(angle) != 0.5 * Math.PI) {
            if (angle >= tr && angle <= tl ||
                angle >= bl && angle <= br) {
                k = this.source.getHeight(context) / 2;
                w = k / Math.tan(angle);
            } else {
                k = this.source.getWidth(context) / 2;
                w = k * Math.tan(angle);
            }
            l = Math.sqrt(k * k + w * w);
        } else {
            l = this.source.getHeight(context) / 2;
        }

        let vec = Vector2D.sub(c2, c1);
        let unit = Vector2D.unit(vec);
        let p1 = Vector2D.add(c1, Vector2D.scale(unit, l));

        // determine end (target) point
        tl = Vector2D.angle(c2, this.target.position);
        br = tl + Math.PI;
        tr = Math.PI - tl;
        bl = Math.PI + tr;
        angle = Vector2D.angle(c2, c1);
        if (Math.abs(angle) != 0.5 * Math.PI) {
            if (angle >= tr && angle <= tl ||
                angle >= bl && angle <= br) {
                k = this.target.getHeight(context) / 2;
                w = k / Math.tan(angle);
            } else {
                k = this.target.getWidth(context) / 2;
                w = k * Math.tan(angle);
            }
            l = Math.sqrt(k * k + w * w);
        } else {
            l = this.target.getHeight(context) / 2;
        }

        vec = Vector2D.sub(c1, c2);
        unit = Vector2D.unit(vec);
        let p2 = Vector2D.add(c2, Vector2D.scale(unit, l));

        context.restore();

        let arrow = new Arrow(p1.x(), p1.y(), p2.x(), p2.y(), this.offset);
        return arrow;
    }
}
