import { Component, Vue } from "vue-property-decorator";
import WithRender from "./menu-toggle.html?style=./menu-toggle.scss";
@Component({
    name: "modeller-menu-toggle"
})
@WithRender
class MenuToggleComponent extends Vue {
    isOpen: boolean = false;
}

export { MenuToggleComponent };