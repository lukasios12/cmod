/// <reference path='../feedback/index.ts'/>

class GraphDrawingOptions {
    public selected: number;
    public feedback: Feedback;

    public constructor(feedback: Feedback = null, selected: number = null) {
        this.feedback = feedback;
        this.selected = selected;
    }
}
