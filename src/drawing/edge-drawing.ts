class EdgeDrawing implements Drawing {
    public edge: Edge;

    public constructor(edge: Edge) {
        this.edge = edge;
    }

    public draw(context: CanvasRenderingContext2D) {
        console.log("edge drawing");
    }
}
