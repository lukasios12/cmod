import { Component, Vue } from "vue-property-decorator";
import WithRender from "./init-environment.html?style=./init-environment.scss";

import WelcomeDialogComponent from "./dialogs/welcome/welcome";
import UploadDialogComponent from "./dialogs/upload/upload";
import LoaderComponent from "src/components/common/loader/loader";

import { getModule } from "vuex-module-decorators";
import SessionModule from "src/store/session";


@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "welcome": WelcomeDialogComponent,
        "upload": UploadDialogComponent,
        "loader": LoaderComponent
    }
})
export default class InitEnvironment extends Vue {
    current() {
        let mod = getModule(SessionModule, this.$store);
        if (mod.isLoading) {
            return LoaderComponent;
        }
        else if (mod.userId !== null) {
            return UploadDialogComponent;
        }
        return WelcomeDialogComponent;
    }

    get isLoading(): boolean {
        let mod = getModule(SessionModule, this.$store);
        return mod.isLoading;
    }
}
