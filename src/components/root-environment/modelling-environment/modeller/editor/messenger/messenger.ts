import { Vue, Component, Prop } from "vue-property-decorator";
import WithRender from "./messenger.html?style=./messenger.scss";

import Feedback from "src/feedback/feedback";
import FeedbackCode from "src/feedback/feedback-code";
import FeedbackTranslator from "src/feedback/feedback-translator";

@WithRender
@Component({
    name: "messenger"
})
export default class MessengerComponent extends Vue {
    @Prop(Feedback) feedback!: Feedback;
    @Prop(Number) id!: number | null;

    get show(): boolean {
        return this.showGeneral || this.showSpecific;
    }

    get showGeneral() {
        return !this.feedback.general.isEmpty() &&
               !this.feedback.general.codes.has(FeedbackCode.CORRECT_INITIAL_STATE);
    }

    get showSpecific() {
        return this.id !== null && this.specific !== null;
    }

    get general(): Array<string> {
        let messages = new Array<string>();
        this.feedback.general.codes.forEach((code) => {
            messages.push(FeedbackTranslator.translate(code));
        });
        return messages;
    }

    get specific(): Array<string> {
        if (this.id !== null) {
            let codes = this.feedback.get(this.id).codes;
            let messages = new Array<string>();
            codes.forEach((code) => {
                messages.push(FeedbackTranslator.translate(code));
            });
            return messages;
        }
        return null;
    }
}
