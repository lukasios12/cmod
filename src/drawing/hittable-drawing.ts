interface Hittable extends Drawing {
    hit(point: Vector2D, context: CanvasRenderingContext2D): boolean;
}

function isHittable(object: any): object is Hittable {
    return 'hit' in object;
}
