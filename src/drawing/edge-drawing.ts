abstract class EdgeDrawing implements Drawing {
    public source: StateDrawing;
    public label: string;

    public constructor(source: StateDrawing, label: string) {
        this.label = label;
        this.source = source;
    }

    public abstract draw(context:CanvasRenderingContext2D);
}
