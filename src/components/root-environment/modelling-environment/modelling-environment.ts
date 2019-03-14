import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modelling-environment.html?style=./modelling-environment.scss";

import { HeaderComponent } from "./header/header";
import { MenuComponent } from "./menu/menu";
import { MenuToggleComponent } from "./menu-toggle/menu-toggle";
import { ModellerComponent } from "./modeller/modeller";

@Component({
    components: {
        "modeller-environment": ModellerComponent,
        "modeller-header": HeaderComponent,
        "modeller-menu": MenuComponent,
        "modeller-menu-toggle": MenuToggleComponent,
    }
})
@WithRender
class ModellingEnvironment extends Vue {
    
}

export { ModellingEnvironment };