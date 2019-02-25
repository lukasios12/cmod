class IncorrectStateStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = "red";
        context.lineWidth = 16;
    }
}
