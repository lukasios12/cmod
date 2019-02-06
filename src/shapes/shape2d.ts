interface Shape2D {
    stroke(ctx: CanvasRenderingContext2D);
    fill(ctx: CanvasRenderingContext2D);
    hit(point: Point2D, ctx: CanvasRenderingContext2D);
}
