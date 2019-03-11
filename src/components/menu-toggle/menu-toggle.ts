import { Component, Vue } from "vue-property-decorator";
import WithRender from "./menu-toggle.html";

@Component({
    name: "modeller-menu-toggle"
})
@WithRender
class MenuToggleComponent extends Vue {
    isOpen: boolean = true;
}

export { MenuToggleComponent };