/// <reference path='../system/graph/index.ts'/>
/// <reference path='../stylemanager/index.ts'/>
/// <reference path='../utils/canvas-rendering-context-2d-utils.ts'/>

class StateDrawing implements HittableDrawing, Draggable {
    public state: State;
    public position: Vector2D;

    public constructor(state: State, position: Vector2D = null) {
        this.state = state;
        if(position) {
            this.position = position;
        } else {
            this.position = new Vector2D(0, 0);
        }
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save();
        StyleManager.setStateTextStyle(context);
        let text = this.state.toString();
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let box = new Rectangle(this.position.x(),
                                this.position.y(),
                                width,
                                height);
        context.restore();
        box.fill(context);
        box.stroke(context);
        StyleManager.setStateTextStyle(context);
        context.fillText(
            text,
            this.position.x() + width / 2,
            this.position.y() + height / 2
        );
    }

    public hit(point: Vector2D, context: CanvasRenderingContext2D) {
        let height = this.getHeight(context);
        let width = this.getWidth(context);
        return (point.x() >= this.position.x() && point.x() <= this.position.x() + width &&
                point.y() >= this.position.y() && point.y() <= this.position.y() + height)
    }

    public drag(point: Vector2D, context: CanvasRenderingContext2D) {
        let width = this.getWidth(context);
        let height = this.getHeight(context);
        let newPos = new Vector2D(point.x() - (width / 2), point.y() - (height / 2));
        this.position = newPos;
    }

    public center(context:CanvasRenderingContext2D) {
        let vector = new Vector2D(this.position.x(), this.position.y());
        let wh = new Vector2D(this.getWidth(context) / 2, this.getHeight(context) / 2);
        return Vector2D.add(vector, wh);
    }

    protected getHeight(context: CanvasRenderingContext2D) {
        return 1.5 * CanvasRenderingContext2DUtils.getFontSize(context);
    }

    protected getWidth(context: CanvasRenderingContext2D) {
        return context.measureText(this.state.toString()).width + 10;
    }
}
