import { Prop, Emit, Component, Vue } from "vue-property-decorator";
import WithRender from "./menu-toggle.html?style=./menu-toggle.scss";

@Component({
    name: "modeller-menu-toggle",
})
@WithRender
export default class MenuToggleComponent extends Vue {
    @Prop(Boolean) 
    isOpen!: boolean
    
    @Emit("menu-toggle")
    menuToggle() { }
}
