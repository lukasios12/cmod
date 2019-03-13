import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller-manager.html?style=./modeller-manager.scss";

import { HeaderComponent } from "src/components/header/header";
import { MenuComponent } from "src/components/menu/menu";
import { MenuToggleComponent } from "src/components/menu-toggle/menu-toggle";
import { ModellerComponent } from "../modeller/modeller";

@Component({
    components: {
        "modeller-environment": ModellerComponent,
        "modeller-header": HeaderComponent,
        "modeller-menu": MenuComponent,
        "modeller-menu-toggle": MenuToggleComponent,
    }
})
@WithRender
class ModellerManagerComponent extends Vue {
    
}

export { ModellerManagerComponent };