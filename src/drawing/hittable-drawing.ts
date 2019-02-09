interface HittableDrawing extends Drawing {
    hit(point: Vector2D, context: CanvasRenderingContext2D): boolean;
}
