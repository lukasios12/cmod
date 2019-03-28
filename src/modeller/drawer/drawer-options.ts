export default interface DrawerOptions {
    minZoom: number;
    maxZoom: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    gridOptions: GridOptions;
}

interface GridOptions {
    drawGrid: boolean;
    snapGrid: boolean;
    horizontalGridSeperation: number;
    verticalGridSeperation: number;
}

export { GridOptions };
