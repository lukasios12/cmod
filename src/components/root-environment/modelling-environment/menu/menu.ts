import { Prop, Component, Vue } from "vue-property-decorator";
import WithRender from "./menu.html?style=./menu.scss";
import { getModule } from "vuex-module-decorators";
import DrawerSettingsModule from "src/store/drawer-settings";

import SwitchComponent from "src/components/common/switch/switch";

@WithRender 
@Component({
    name: "modeller-menu",
    components: {
        "switcher": SwitchComponent,
    }
})
export default class MenuComponent extends Vue {
    @Prop(Boolean)
    isOpen!: boolean;

    toggleSnap() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        mod.toggleSnap();
    }

    toggleDraw() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        mod.toggleDraw();
    }

    get snapToGrid(): boolean {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings.gridOptions.snapGrid;
    }

    get drawGrid(): boolean {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings.gridOptions.drawGrid;
    }
}
