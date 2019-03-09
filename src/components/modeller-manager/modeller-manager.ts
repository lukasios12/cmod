import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modeller-manager.html";

@Component
@WithRender
class ModellerManagerComponent extends Vue {
    message: string = "hallo";
}

export { ModellerManagerComponent };