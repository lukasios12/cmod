/// <reference path='../system/graph/index.ts'/>
/// <reference path='../stylemanager/index.ts'/>
/// <reference path='../utils/canvas-rendering-context-2d-utils.ts'/>

class StateDrawing implements HittableDrawing, Draggable {
    public state: State;
    public position: Point2D;

    public constructor(state: State, position: Point2D = null) {
        this.state = state;
        if(position) {
            this.position = position;
        } else {
            this.position = new Point2D(0, 0);
        }
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        StyleManager.setStateTextStyle(context);
        let text = this.state.toString();
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let box = new Rectangle(this.position.x,
                                this.position.y,
                                width,
                                height);
        context.restore();
        box.fill(context);
        box.stroke(context);
        StyleManager.setStateTextStyle(context);
        context.fillText(text, this.position.x + width / 2, this.position.y + height / 2);
    }

    public hit(point: Point2D, context: CanvasRenderingContext2D) {
        console.log(point);
        let height = this.getHeight(context);
        let width = this.getWidth(context);
        console.log(this.position, width, height);
        return (point.x >= this.position.x && point.x <= this.position.x + width &&
                point.y >= this.position.y && point.y <= this.position.y + height)
    }

    public drag(point: Point2D, context: CanvasRenderingContext2D) {
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let newPos = new Point2D(point.x - (width / 2), point.y - (height / 2));
        this.position = newPos;
    }

    protected getHeight(context: CanvasRenderingContext2D) {
        return 1.5 * CanvasRenderingContext2DUtils.getFontSize(context);
    }

    protected getWidth(context: CanvasRenderingContext2D) {
        return context.measureText(this.state.toString()).width + 10;
    }
}
