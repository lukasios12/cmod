import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller.html?style=./modeller.scss";

import { Multipane, MultipaneResizer } from "vue-multipane";

@Component({
    components: {
        "split-container": Multipane,
        "split-container-resizer": MultipaneResizer
    }
})
@WithRender
class ModellerComponent extends Vue {

}

export { ModellerComponent };