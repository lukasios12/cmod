import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller.html?style=./modeller.scss";

import { Multipane, MultipaneResizer } from "vue-multipane";

@WithRender
@Component({
    components: {
        "split-container": Multipane,
        "split-container-resizer": MultipaneResizer
    }
})
export default class ModellerComponent extends Vue {

}
