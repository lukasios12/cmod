class CorrectEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = Colors.green;
        context.lineWidth = 10;
    }
}
