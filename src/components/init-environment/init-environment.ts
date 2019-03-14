import { Component, Vue } from "vue-property-decorator";
import WithRender from "./init-environment.html?style=./init-environment.scss";

import { WelcomeDialogComponent } from "./dialogs/welcome/welcome";
import { UploadDialogComponent } from "./dialogs/upload/upload";
import { LoaderComponent } from "src/components/common/loader/loader";

@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "welcome": WelcomeDialogComponent,
        "upload": UploadDialogComponent,
        "loader": LoaderComponent
    }
})
class InitEnvironment extends Vue {
    current = LoaderComponent;
}

export { InitEnvironment }