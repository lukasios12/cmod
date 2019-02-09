class Point2D {
    public x;
    public y;

    public constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public static toVector(p: Point2D) {
        let vec = new Vector(2);
        vec.set(0, p.x);
        vec.set(1, p.y);
        return vec;
    }
}
