import { Component, Vue } from "vue-property-decorator";
import WithRender from "./welcome.html?style=./welcome.scss";

import AlertComponent from "src/components/common/messages/alert/alert";

import { getModule } from "vuex-module-decorators";
import UserModule from "src/store/user/user";

@WithRender
@Component({
    name: "welcome",
    components: {
        "alert": AlertComponent
    }
})
export default class WelcomeDialogComponent extends Vue {
    title: string = "Welcome"
    username: string = ""
    hide: boolean = false;

    get error(): string {
        let mod = getModule(UserModule, this.$store);
        return mod.error;
    }

    get showAlert() {
        let mod = getModule(UserModule, this.$store);
        return mod.error.length > 0 && !this.hide;
    }

    send() {
        let mod = getModule(UserModule, this.$store);
        this.hide = false;
        mod.register(this.username);
    }

    closeAlert() {
        this.hide = true;
    }
}
