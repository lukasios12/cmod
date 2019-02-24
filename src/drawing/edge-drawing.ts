abstract class EdgeDrawing implements Hittable {
    public source: StateDrawing;
    public label: string;

    public constructor(source: StateDrawing, label: string) {
        this.label = label;
        this.source = source;
    }

    public abstract draw(context:CanvasRenderingContext2D);

    public abstract hit(point: Vector2D, context: CanvasRenderingContext2D);
}
