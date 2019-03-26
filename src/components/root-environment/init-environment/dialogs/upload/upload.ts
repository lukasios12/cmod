import { Component, Vue } from "vue-property-decorator";
import WithRender from "./upload.html?style=./upload.scss";

import AlertComponent from "src/components/common/messages/alert/alert";

import { getModule } from "vuex-module-decorators";
import UserModule from "src/store/user/user";

@WithRender
@Component({
    name: "upload-dialog",
    components: {
        "alert": AlertComponent
    }
})
export default class UploadDialogComponent extends Vue {
    hideError: boolean = false;

    closeAlert() {
        this.hideError = true;
    }

    get error() {
        let mod = getModule(UserModule, this.$store);
        return mod.error;
    }

    get showError() {
        return this.error.length > 0 && !this.hideError;
    }

    send() {
        console.log("uploading");
    }
}
