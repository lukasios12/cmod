import { Component, Vue } from "vue-property-decorator";
import WithRender from "./root-environment.html?style=./root-environment.scss";

import { InitEnvironment } from "src/components/init-environment/init-environment";
import { ModellingEnvironment } from "src/components/modelling-environment/modelling-environment";

@Component({
    name: "root-environment",
    components: {
        "init-environment": InitEnvironment,
        "modelling-environment": ModellingEnvironment,
    }
})
@WithRender
class RootEnvironment extends Vue {
    components = [
        InitEnvironment,
        ModellingEnvironment,
    ];
    current = ModellingEnvironment;
    // current = DialogManagerComponent;
}

export { RootEnvironment };