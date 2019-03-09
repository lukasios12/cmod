import { Component, Vue } from "vue-property-decorator";
import WithRender from "./dialog-manager.html";

import { WelcomeDialogComponent } from "src/components/dialogs/welcome/welcome";
import { UploadDialogComponent } from "src/components/dialogs/upload/upload";
import { AlertComponent } from "src/components/messages/alert/alert";

@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "alert": AlertComponent,
        "welcome": WelcomeDialogComponent,
        "upload": UploadDialogComponent,
    }
})
class DialogManagerComponent extends Vue {
    current = UploadDialogComponent;
}

export { DialogManagerComponent }