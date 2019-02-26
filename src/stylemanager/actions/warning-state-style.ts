class WarningStateStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.strokeStyle = Colors.orange;
        context.lineWidth = 16;
    }
}
