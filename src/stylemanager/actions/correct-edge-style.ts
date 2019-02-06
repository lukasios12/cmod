class CorrectEdgeStyle implements StyleManagerAction {
    public exec(context: CanvasRenderingContext2D) {
        context.font = "12px mono";
        context.fillStyle = "white";
        context.strokeStyle = "green";
        context.lineWidth = 12;
        context.textBaseline = "middle";
        context.textAlign = "center";
    }
}
