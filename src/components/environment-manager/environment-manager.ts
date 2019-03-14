import { Component, Vue } from "vue-property-decorator";
import WithRender from "./environment-manager.html?style=./environment-manager.scss";

import { InitEnvironment } from "src/components/init-environment/init-environment";
import { ModellingEnvironment } from "src/components/modelling-environment/modelling-environment";

@Component({
    name: "environment-manager",
    components: {
        "init-environment": InitEnvironment,
        "modelling-environment": ModellingEnvironment,
    }
})
@WithRender
class EnvironmentManager extends Vue {
    components = [
        InitEnvironment,
        ModellingEnvironment,
    ];
    current = ModellingEnvironment;
    // current = DialogManagerComponent;
}

export { EnvironmentManager };