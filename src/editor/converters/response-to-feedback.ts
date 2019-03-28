import Feedback from "src/editor/feedback/feedback";
import { FeedbackResponse } from "src/types";

export default class ResponseToFeedback {
    public static convert(fr: FeedbackResponse) {
        let f = new Feedback();
        for(let i = 0; i < fr.general.length; i++) {
            f.add(fr.general[i]);
        }
        // for(let i = 0; i < fr.specific.length; i++) {
        //     f.add(fr.specific[i]);
        // }
        return f;
    }
}
