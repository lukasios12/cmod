import { Vue, Component, Prop } from "vue-property-decorator";
import WithRender from "./messenger.html?style=./messenger.scss";

import Feedback from "src/editor/feedback/feedback";
import FeedbackCode from "src/editor/feedback/feedback-code";
import FeedbackTranslator from "src/editor/feedback/feedback-translator";

@WithRender
@Component({
    name: "messenger"
})
export default class MessengerComponent extends Vue {
    @Prop(Feedback) feedback!: Feedback;

    get show(): boolean {
        return !this.feedback.general.isEmpty() &&
               !this.feedback.general.contains(FeedbackCode.CORRECT_INITIAL_STATE);
    }

    get general(): Array<string> {
        let codes = this.feedback.general.toArray();
        let messages = new Array<string>();
        for(let i = 0; i < codes.length; i++) {
            messages.push(FeedbackTranslator.translate(codes[i]));
        }
        return messages;
    }

    // get specific(): Array<FeedbackCode> {
    //     return this.feedback.specific.
    // }
}
