import { Component, Vue } from "vue-property-decorator";
import WithRender from "./main-manager.html?style=./main-manager.scss";
import { DialogManagerComponent } from "src/components/dialog-manager/dialog-manager";
import { ModellerManagerComponent } from "src/components/modeller-manager/modeller-manager";

@Component({
    name: "manager-main",
    components: {
        "manager-dialog": DialogManagerComponent,
        "manager-modeller": ModellerManagerComponent,
    }
})
@WithRender
class MainManagerComponent extends Vue {
    components = [
        DialogManagerComponent,
        ModellerManagerComponent,
    ];
    current = ModellerManagerComponent;
    // current = DialogManagerComponent;
}

export { MainManagerComponent };