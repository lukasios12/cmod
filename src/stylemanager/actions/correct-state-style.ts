class CorrectStateStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = "green";
        context.fillStyle = "white";
        context.lineWidth = 15;
    }
}
