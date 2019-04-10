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
               !this.feedback.general.contains(FeedbackCode.CORRECT_INITIAL_STATE);
    }

    get showSpecific() {
        return this.id !== null;
    }

    get general(): Array<string> {
        let codes = this.feedback.general.toArray();
        let messages = new Array<string>();
        for(let i = 0; i < codes.length; i++) {
            messages.push(FeedbackTranslator.translate(codes[i]));
        }
        return messages;
    }

    get specific(): Array<string> {
        if (this.id) {
            let codes = this.feedback.specific.get(this.id).toArray();
            let messages = new Array<string>();
            for(let i = 0; i < codes.length; i++) {
                messages.push(FeedbackTranslator.translate(codes[i]));
            }
            return messages;
        }
        return null;
    }
}
