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
        // this.drawGrid();
        let context = this.canvas.getContext("2d");
        // Matrix3D.setTransform(this.currentTransform, context);
        if(drawing) {
            drawing.draw(context);
        } else if(this.drawingCache) {
            this.drawingCache.draw(context);
        }
        this.drawingCache = drawing;
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
        console.log(this.currentTransform);
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

    public globalToLocal(point: Point2D) {
        let context = this.canvas.getContext("2d");
        let vector = new Matrix(3, 1);
        vector.set(0, 0, point.x);
        vector.set(1, 0, point.y);
        vector.set(2, 0, 1);
        let mat = this.currentTransform.inverse();
        let normalized = Matrix.mult(mat, vector);
        // console.log(vector, mat, normalized);
        return new Point2D(normalized.get(0,0), normalized.get(1,0));
    }

    protected drawGrid(): void {
        let context = this.canvas.getContext("2d");
        let width = this.canvas.width;
        let height = this.canvas.height;
        let amount = 50;

        let h = Math.round(amount);
        let v = Math.round(amount);

        context.strokeStyle = "rgba(255, 100, 100, .8)";
        context.lineWidth = 1;
        let th = this.currentTransform.get(0, 2);
        let tv = this.currentTransform.get(1, 2);
        for(let i = 0; i < amount; i++) {
            context.beginPath();
            context.moveTo(-th, i * v - tv);
            context.lineTo(width - th, i * v - tv);
            context.closePath();
            context.stroke();
        }

        for(let i = 0; i < amount; i++) {
            context.beginPath();
            context.moveTo(i * h, -th);
            context.lineTo(i * h, height);
            context.closePath();
            context.stroke();
        }
    }
}
