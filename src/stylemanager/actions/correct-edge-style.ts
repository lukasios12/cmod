class CorrectEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = "green";
        context.lineWidth = 10;
    }
}
