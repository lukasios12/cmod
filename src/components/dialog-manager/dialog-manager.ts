import { Component, Vue } from "vue-property-decorator";
import WithRender from "./dialog-manager.html";

import { WelcomeDialogComponent } from "src/components/dialogs/welcome/welcome";
import { AlertComponent } from "src/components/messages/alert/alert";

@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "alert": AlertComponent,
        "welcome": WelcomeDialogComponent
    }
})
class DialogManagerComponent extends Vue {
    current = WelcomeDialogComponent;
}

export { DialogManagerComponent }