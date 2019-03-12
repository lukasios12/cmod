import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller.html?style=./modeller.scss";

import { HeaderComponent } from "src/components/header/header";

@Component({
    name: "modeller",
    components: {
        "cora-header": HeaderComponent
    }
})
@WithRender
class ModellerComponent extends Vue {

}

export { ModellerComponent };