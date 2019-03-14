import { Component, Vue } from "vue-property-decorator";
import WithRender from "./root-environment.html?style=./root-environment.scss";

import { InitEnvironment } from "src/components/init-environment/init-environment";
import { ModellingEnvironment } from "src/components/modelling-environment/modelling-environment";
import { FooterComponent } from "./footer/footer";

@Component({
    name: "root-environment",
    components: {
        "init-environment": InitEnvironment,
        "modelling-environment": ModellingEnvironment,
        "footer-component": FooterComponent
    }
})
@WithRender
class RootEnvironment extends Vue {
    components = [
        InitEnvironment,
        ModellingEnvironment,
    ];
    current = ModellingEnvironment;
}

export { RootEnvironment };