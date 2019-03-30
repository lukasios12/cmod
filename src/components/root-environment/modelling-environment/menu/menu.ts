import { Prop, Component, Vue } from "vue-property-decorator";
import WithRender from "./menu.html?style=./menu.scss";

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
}
