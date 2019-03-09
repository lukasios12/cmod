import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller.html";

import { Header } from "src/components/header/header";

@Component({
    name: "modeller",
    components: {
        "cora-header": Header
    }
})
@WithRender
class ModellerComponent extends Vue {

}

export { ModellerComponent };