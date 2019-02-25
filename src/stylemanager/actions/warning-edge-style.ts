class WarningEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = "orange";
        context.lineWidth = 10;
    }
}
