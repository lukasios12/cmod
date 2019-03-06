import { Vector2D } from "src/modeller/shapes/vector2d";

export interface Draggable {
    drag(point: Vector2D, context: CanvasRenderingContext2D): void;
}

export function isDraggable(object: any): object is Draggable {
    return 'drag' in object;
}
