import {Vector2D} from "./vector2d";

class Intersection {
    public origin: Vector2D;
    public vector: Vector2D;
    public length: number;

    public constructor(o: Vector2D, v: Vector2D, l: number) {
        this.origin = o;
        this.vector = v;
        this.length = l;
    }
}

export { Intersection }