class CorrectEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.fillStyle = "white";
        context.strokeStyle = "green";
        context.lineWidth = 12;
    }
}
