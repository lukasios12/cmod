class DrawerOptions {
    public minZoom: number;
    public maxZoom: number;
    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    public constructor(miz, maz, mix, max, miy, may) {
        this.minZoom = miz;
        this.maxZoom = maz;
        this.minX = mix;
        this.maxX = max;
        this.minY = miy;
        this.maxY = may;
    }
}
