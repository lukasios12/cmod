import { Prop, Component, Vue } from "vue-property-decorator";
import WithRender from "./menu.html?style=./menu.scss";

@WithRender 
@Component({
    name: "modeller-menu"
})
export default class MenuComponent extends Vue {
    @Prop(Boolean)
    isOpen!: boolean;
}
