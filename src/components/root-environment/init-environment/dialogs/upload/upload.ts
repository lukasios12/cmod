import { Component, Vue } from "vue-property-decorator";
import WithRender from "./upload.html?style=./upload.scss";

import AlertComponent from "src/components/common/messages/alert/alert";

import { getModule } from "vuex-module-decorators";
import SessionModule from "src/store/session";

@WithRender
@Component({
    name: "upload-dialog",
    components: {
        "alert": AlertComponent
    }
})
export default class UploadDialogComponent extends Vue {
    file: File | null = null;
    hideError: boolean = false;

    selectFile(event) {
        let file = event.target.files[0];
        this.file = file;
    }

    closeAlert() {
        this.hideError = true;
    }

    get error() {
        let mod = getModule(SessionModule, this.$store);
        return mod.error;
    }

    get showError() {
        return this.error.length > 0 && !this.hideError;
    }

    send() {
        this.hideError = false;
        let mod = getModule(SessionModule, this.$store);
        mod.uploadPetrinet(this.file).then(() => {
            console.log("uploading complete, succes");
            mod.startSession();
        }).catch(() => {
            console.log("uploading complete, failure");
        });
    }
}
