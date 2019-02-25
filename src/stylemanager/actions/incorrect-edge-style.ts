class IncorrectEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = "red";
        context.lineWidth = 10;
    }
}
