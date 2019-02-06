class CanvasRenderingContext2DUtils {
    public static getFontSize(context: CanvasRenderingContext2D): number {
        return Number(/\d+(?=px)/i.exec(context.font)[0]);
    }
}
