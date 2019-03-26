import { Component, Vue } from "vue-property-decorator";
import WithRender from "./init-environment.html?style=./init-environment.scss";

import WelcomeDialogComponent from "./dialogs/welcome/welcome";
import UploadDialogComponent from "./dialogs/upload/upload";
import LoaderComponent from "src/components/common/loader/loader";

import { getModule } from "vuex-module-decorators";
import UserModule from "src/store/user/user";


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
        if (this.isLoading) {
            return LoaderComponent;
        }
        return WelcomeDialogComponent
    }

    get isLoading(): boolean {
        let mod = getModule(UserModule, this.$store);
        return mod.isLoading;
    }
}
