interface Draggable {
    drag(point: Point2D, context: CanvasRenderingContext2D);
}

function isDraggable(object: any): object is Draggable {
    return 'drag' in object;
}
