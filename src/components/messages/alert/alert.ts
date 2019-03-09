import { Component, Vue } from "vue-property-decorator";
import WithRender from "./alert.html";

@Component({
    name: "alert"
})
@WithRender
class AlertComponent extends Vue {

}

export { AlertComponent };