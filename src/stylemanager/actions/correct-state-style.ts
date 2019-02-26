class CorrectStateStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = Colors.green;
        context.fillStyle = "white";
        context.lineWidth = 16;
    }
}
