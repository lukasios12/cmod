import DrawerOptions from "./drawer-options";

import Drawing from "src/drawing/drawing";
import { isSnappable } from "src/drawing/snappable-drawing";
import Vector2D from "src/shapes/vector2d";

import { Matrix } from "lib/matrix/matrix";
import { clamp } from "lib/math/math";

export default class Drawer {
    public canvas: HTMLCanvasElement;
    protected currentTransform: Matrix;
    protected drawingCache: Drawing | null;
    protected options: DrawerOptions;

    protected initialWidth: number;
    protected initialHeight: number;

    public constructor(canvas: HTMLCanvasElement, options?: DrawerOptions) {
        if (options) {
            this.options = options;
        } else { // default settings
            this.options = {
                minZoom: 1,
                maxZoom: 1 / 10,
                minX: -500,
                maxX:  500,
                minY: -500,
                maxY:  500,
                gridOptions: {
                    drawGrid: true,
                    snapGrid: true,
                    horizontalGridSeperation: 50,
                    verticalGridSeperation:   50
                }
            };
        }

        this.canvas = canvas;
        this.resize();
        this.drawingCache = null;
        this.currentTransform = Matrix.identity(3);
        this.initialWidth = canvas.width;
        this.initialHeight = canvas.height;
    }

    public draw(drawing: Drawing | null = null): void {
        this.clear();
        if(this.options.gridOptions.drawGrid) {
            this.drawGrid();
        }
        let context = this.canvas.getContext("2d"); 
        context!.save();
        if(!drawing) {
            drawing = this.drawingCache;
        }
        if(drawing) {
            if(this.options.gridOptions.snapGrid && isSnappable(drawing)) {
                drawing.snap(this.options.gridOptions.horizontalGridSeperation,
                            this.options.gridOptions.verticalGridSeperation);
            }
            drawing.draw(context!);
            this.drawingCache = drawing;
        }
        context!.restore();
    
    }

    public clear(): void {
        let context = this.canvas.getContext("2d");
        context!.save();
        context!.setTransform(1, 0, 0, 1, 0, 0);
        let width = this.canvas.width;
        let height = this.canvas.height;
        context!.clearRect(0, 0, width, height);
        context!.restore();
    }

    public transform(mat: Matrix): void {
        let t = Matrix.mult(this.currentTransform, mat);
        this.setTransform(t);
    }

    public setTransform(mat: Matrix): void {
        let context = this.canvas.getContext("2d");
        let options = this.options;

        let hscale = mat.get(0, 0);
        let vscale = mat.get(1, 1);
        let htrans = mat.get(0, 2);
        let vtrans = mat.get(1, 2);

        mat.set(0, 0, clamp(hscale, options.minZoom, options.maxZoom));
        mat.set(1, 1, clamp(vscale, options.minZoom, options.maxZoom));
        hscale = mat.get(0, 0);
        vscale = mat.get(1, 1);
        // let minx = options.minX - ((this.initialWidth - this.canvas.width) / 2);
        // let maxx = options.maxX + ((this.initialWidth - this.canvas.width) / 2);
        mat.set(0, 2, htrans);
        mat.set(1, 2, vtrans);

        this.currentTransform = mat;
        context!.setTransform(mat.get(0,0), mat.get(1,0), mat.get(0,1),
                             mat.get(1,1), mat.get(0,2), -mat.get(1,2));

        // console.log(this.initialWidth, this.canvas.width, mat);
        this.draw(this.drawingCache);
    }

    public shift(h: number = 0, v: number = 0): void {
        let mat = new Matrix(3, 3);
        mat.set(0, 2, h);
        mat.set(1, 2, v);
        let r = Matrix.add(mat, this.currentTransform);
        this.setTransform(r);
    }

    public zoom(amount: number): void {
        let mat = Matrix.identity(3);
        mat.set(0,0, amount);
        mat.set(1,1, amount);
        this.transform(mat);
    }

    public resize(): void {
        let parent = this.canvas.parentElement;
        if (parent) {
            this.canvas.width = parent.offsetWidth;
            this.canvas.height = parent.offsetHeight;
        }

        if(this.drawingCache) {
            this.draw(this.drawingCache);
        }
        this.setTransform(Matrix.identity(3));
    }

    public setOptions(options: DrawerOptions) {
        this.options = options;
        this.draw();
    }

    public globalToLocal(event: MouseEvent): Vector2D {
        let box = this.canvas.getBoundingClientRect();
        let x = event.clientX - Math.round(box.left);
        let y = event.clientY - Math.round(box.top);
        let context = this.canvas.getContext("2d");
        let vector = new Matrix(3, 1);
        vector.set(0, 0, x);
        vector.set(1, 0, y);
        vector.set(2, 0, 1);
        let mat = this.currentTransform.inverse();
        let normalized = Matrix.mult(mat, vector);
        let result = new Vector2D(normalized.get(0,0), normalized.get(1,0));
        return result;
    }

    protected drawGrid(): void {
        let context = this.canvas.getContext("2d");
        let width = this.canvas.width;
        let height = this.canvas.height;

        let hdist = this.options.gridOptions.horizontalGridSeperation;
        let vdist = this.options.gridOptions.verticalGridSeperation;

        let transform = this.currentTransform;
        let hoffset = transform.get(0, 2);
        let voffset = transform.get(1, 2);

        let xmin = -(Math.ceil((hoffset / hdist) / transform.get(0, 0)) * hdist);
        let xmax = Math.ceil((width / transform.get(0,0)) / hdist) *
                   hdist + xmin + hdist;

        let ymin = Math.floor((voffset / vdist) / transform.get(1,1)) * vdist;
        let ymax = Math.ceil((height / transform.get(1,1)) / vdist) *
                   vdist + ymin + vdist;

        context!.save();
        context!.strokeStyle = "rgb(220, 220, 220)";
        context!.lineWidth = 1; // px
        for(let x = xmin; x <= xmax; x += hdist) {
            context!.beginPath();
            context!.moveTo(x, ymin);
            context!.lineTo(x, ymax);
            context!.stroke();
        }
        context!.closePath();

        for(let y = ymin; y <= ymax; y += vdist) {
            context!.beginPath();
            context!.moveTo(xmin, y);
            context!.lineTo(xmax, y);
            context!.stroke();
        }
        context!.closePath();
        context!.restore();
    }

    public registerEvents(): void {
        window.addEventListener('resize', (event) => {
            this.resize();
        });
        // register key events
        let canvas = this.canvas;
        let movementSpeed = 40;
        let zoomAmount = 1.2;
        canvas.addEventListener("keydown", (event) => {
            switch(event.keyCode) {
                case 38: // up
                    this.shift(0, -movementSpeed);
                    break;
                case 39: // right
                    this.shift(movementSpeed);
                    break;
                case 40: // down
                    this.shift(0, movementSpeed);
                    break;
                case 37: // left
                    this.shift(-movementSpeed);
                    break;
                case 61: // +
                    this.zoom(zoomAmount);
                    break;
                case 173: // -
                    this.zoom(1 / zoomAmount);
                    break;
            }
        });

        // register mouse events
        let mouseDownMiddle = false;
        canvas.addEventListener("mousedown", (event) => {
            if (event.buttons === 1) {
                canvas.focus();
            }
            if (event.buttons === 4) {
                event.preventDefault();
                mouseDownMiddle = true;
            }
        });

        canvas.addEventListener("mousemove", (event) => {
            if(mouseDownMiddle) {
                let m = Matrix.identity(3);
                m.set(0, 2, event.movementX);
                m.set(1, 2, -event.movementY);
                this.transform(m);
            }
        });

        canvas.addEventListener("mouseup", (event) => {
            mouseDownMiddle = false;
        });
    }
}
