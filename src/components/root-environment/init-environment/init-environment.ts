import { Component, Vue } from "vue-property-decorator";
import WithRender from "./init-environment.html?style=./init-environment.scss";

import Session from "src/services/session-service";
import { Observer } from "lib/observer/observer";

import WelcomeDialogComponent from "./dialogs/welcome/welcome";
import UploadDialogComponent from "./dialogs/upload/upload";
import LoaderComponent from "src/components/common/loader/loader";

@WithRender
@Component({
    name: "manager-dialog",
    components: {
        "welcome": WelcomeDialogComponent,
        "upload": UploadDialogComponent,
        "loader": LoaderComponent
    }
})
export default class InitEnvironment extends Vue implements Observer<Session>{
    mounted() {
        Session.getInstance().attach(this);
    }
    
    update(session: Session) {
        this.$forceUpdate();
    }

    current() {
        let session = Session.getInstance();
        if (session.userId !== null) {
            console.log(session.userId);
            return UploadDialogComponent;
        }
        return WelcomeDialogComponent
    }
}