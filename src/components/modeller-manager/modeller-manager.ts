import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller-manager.html";

import { Multipane, MultipaneResizer } from "vue-multipane";

@Component({
    components: {
        "multipane": Multipane,
        "multipane-resizer": MultipaneResizer
    }
})
@WithRender
class ModellerManagerComponent extends Vue {
    
}

export { ModellerManagerComponent };