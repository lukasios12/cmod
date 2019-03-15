import { Component, Vue } from "vue-property-decorator";
import WithRender from "./menu.html?style=./menu.scss";

@Component({
    name: "modeller-menu"
})
@WithRender 
export default class MenuComponent extends Vue {
    isHidden: boolean = true;
}