interface Shape2D {
    stroke(ctx: CanvasRenderingContext2D);
    fill(ctx: CanvasRenderingContext2D);
    hit(point: Vector2D, ctx: CanvasRenderingContext2D);
}
