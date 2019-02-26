class IncorrectStateStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = Colors.red;
        context.lineWidth = 16;
    }
}
