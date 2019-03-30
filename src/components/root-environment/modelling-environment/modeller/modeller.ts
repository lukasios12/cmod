import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller.html?style=./modeller.scss";

import Editor from "./editor/editor";
import Imager from "./imager/imager";
import { Multipane, MultipaneResizer } from "vue-multipane";

@WithRender
@Component({
    components: {
        "editor": Editor,
        "imager": Imager,
        "split-container": Multipane,
        "split-container-resizer": MultipaneResizer
    }
})
export default class ModellerComponent extends Vue {
    resize(pane) {
        console.log(this);
    }
}
