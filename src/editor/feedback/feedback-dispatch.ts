import { getModule } from "vuex-module-decorators";

import FeedbackModule from "src/store/feedback";
import Graph from "src/editor/system/graph/graph";

export default class FeedbackDispatch {
    public static get(graph: Graph): void {
        let mod = getModule(FeedbackModule);
        mod.get(graph);
    }
}
