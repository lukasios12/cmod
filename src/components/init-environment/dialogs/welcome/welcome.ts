import { Component, Vue } from "vue-property-decorator";
import WithRender from "./welcome.html?style=./welcome.scss";

@Component({
    name: "welcome"
})
@WithRender
class WelcomeDialogComponent extends Vue {
    title: string = "Welcome"
    username: string = ""

    send(event) {
        console.log(event);
        console.log(this.username);
    }
}

export { WelcomeDialogComponent };