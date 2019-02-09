interface Draggable {
    drag(point: Vector2D, context: CanvasRenderingContext2D);
}

function isDraggable(object: any): object is Draggable {
    return 'drag' in object;
}
