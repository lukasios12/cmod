import { Feedback } from "src/feedback/feedback";

export class GraphDrawingOptions {
    public selected: number | null;
    public feedback: Feedback | null;

    public constructor(feedback: Feedback | null = null, selected: number | null = null) {
        this.feedback = feedback;
        this.selected = selected;
    }
}
