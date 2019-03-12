import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller-manager.html?style=./modeller-manager.scss";

import { Multipane, MultipaneResizer } from "vue-multipane";
import { HeaderComponent } from "src/components/header/header";
import { MenuComponent } from "src/components/menu/menu";
import { MenuToggleComponent } from "src/components/menu-toggle/menu-toggle";

@Component({
    components: {
        "multipane": Multipane,
        "multipane-resizer": MultipaneResizer,
        "modeller-header": HeaderComponent,
        "modeller-menu": MenuComponent,
        "modeller-menu-toggle": MenuToggleComponent,
    }
})
@WithRender
class ModellerManagerComponent extends Vue {
    
}

export { ModellerManagerComponent };