import { Prop, Component, Vue } from "vue-property-decorator";
import WithRender from "./menu.html?style=./menu.scss";
import { getModule } from "vuex-module-decorators";
import SettingsModule from "src/store/settings";

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
        let mod = getModule(SettingsModule, this.$store);
        mod.toggleSnap();
    }

    get snapToGrid(): boolean {
        let mod = getModule(SettingsModule, this.$store);
        return mod.snapToGrid;
    }
}
