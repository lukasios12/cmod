/// <reference path='../feedback/index.ts'/>
/// <reference path='../stylemanager/index.ts'/>

/// <reference path='../../lib/matrix/matrix.ts'/>

class Drawer {
    public canvas: HTMLCanvasElement;
    protected currentTransform: Matrix;
    protected drawingCache: Drawing | null;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.resize();
        this.drawingCache = null;
        this.currentTransform = Matrix.identity(3);
    }

    public draw(drawing: Drawing = null, feedback: Feedback = null): void {
        this.clear();
        this.drawGrid();
        let context = this.canvas.getContext("2d");
        if(drawing) {
            drawing.draw(context);
            this.drawingCache = drawing;
        } else if(this.drawingCache) {
            this.drawingCache.draw(context);
        }
        context.beginPath();
        context.fill();
    }

    public clear(): void {
        let context = this.canvas.getContext("2d");
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let width = this.canvas.width;
        let height = this.canvas.height;
        context.clearRect(0, 0, width, height);
        context.restore();
    }

    public registerEvents(): void {
        window.addEventListener('resize', (event) => {
            this.resize();
        });

        // register key events
        let canvas = this.canvas;
        let context = canvas.getContext("2d");
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
                case 173:
                    this.zoom(1 / zoomAmount);
                    break;
            }
        });

        // register mouse events
        let mouseDownMiddle = false;
        canvas.addEventListener("mousedown", (event) => {
            if(event.buttons == 4) {
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

    public transform(mat: Matrix): void {
        let t = Matrix.mult(this.currentTransform, mat);
        this.setTransform(t);
    }

    public setTransform(mat: Matrix): void {
        this.currentTransform = mat;
        let context = this.canvas.getContext("2d");
        context.setTransform(mat.get(0,0), mat.get(1,0), mat.get(0,1),
                             mat.get(1,1), mat.get(0,2), -mat.get(1,2));
        this.draw(this.drawingCache);
    }

    public resize(): void {
        let parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;

        if(this.drawingCache) {
            this.draw(this.drawingCache);
        }
        this.setTransform(Matrix.identity(3));
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

    public globalToLocal(point: Vector2D) {
        let context = this.canvas.getContext("2d");
        let vector = new Matrix(3, 1);
        vector.set(0, 0, point.x());
        vector.set(1, 0, point.y());
        vector.set(2, 0, 1);
        let mat = this.currentTransform.inverse();
        let normalized = Matrix.mult(mat, vector);
        context.rect(normalized.get(0,0) - 5, normalized.get(1,0) - 5, 10, 10);
        context.fill();
        return new Vector2D(normalized.get(0,0), normalized.get(1,0));
    }

    protected drawGrid(): void {
        let context = this.canvas.getContext("2d");
        let width = this.canvas.width;
        let height = this.canvas.height;

        let hdist = 30;
        let vdist = 30;

        let transform = this.currentTransform;
        let hoffset = transform.get(0, 2);
        let voffset = transform.get(1, 2);

        let xmin = -(Math.ceil((hoffset / hdist) / transform.get(0, 0)) * hdist);
        let xmax = Math.ceil((width / transform.get(0,0)) / hdist) *
                   hdist + xmin + hdist;

        let ymin = Math.floor((voffset / vdist) / transform.get(1,1)) * vdist;
        let ymax = Math.ceil((height / transform.get(1,1)) / vdist) *
                   vdist + ymin + vdist;

        context.save();
        context.strokeStyle = "rgb(220, 220, 220)";
        context.lineWidth = 1; // px
        for(let x = xmin; x <= xmax; x += hdist) {
            context.beginPath();
            context.moveTo(x, ymin);
            context.lineTo(x, ymax);
            context.stroke();
        }

        for(let y = ymin; y <= ymax; y += vdist) {
            context.beginPath();
            context.moveTo(xmin, y);
            context.lineTo(xmax, y);
            context.stroke();
        }
        context.restore();
    }
}
