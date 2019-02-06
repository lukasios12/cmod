interface HittableDrawing extends Drawing {
    hit(point: Point2D, context: CanvasRenderingContext2D): boolean;
}
