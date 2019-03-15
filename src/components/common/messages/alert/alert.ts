import { Component, Vue } from "vue-property-decorator";
import WithRender from "./alert.html?style=./alert.scss";

@Component({
    name: "alert"
})
@WithRender
export default class AlertComponent extends Vue {

}

export { AlertComponent };