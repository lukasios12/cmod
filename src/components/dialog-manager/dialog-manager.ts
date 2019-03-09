import { Component, Vue } from "vue-property-decorator";
import WithRender from "./dialog-manager.html";

import { WelcomeDialogComponent } from "src/components/dialogs/welcome/welcome";
import { UploadDialogComponent } from "src/components/dialogs/upload/upload";
import { LoaderComponent } from "src/components/loader/loader";

@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "welcome": WelcomeDialogComponent,
        "upload": UploadDialogComponent,
        "loader": LoaderComponent
    }
})
class DialogManagerComponent extends Vue {
    current = LoaderComponent;
}

export { DialogManagerComponent }