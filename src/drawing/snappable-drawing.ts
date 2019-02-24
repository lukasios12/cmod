interface Snappable {
    snap(hgrid: number, vgrid: number): void;
}

function isSnappable(object: any): object is Snappable {
    return 'snap' in object;
}
