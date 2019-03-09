import { Component, Vue } from "vue-property-decorator";
import WithRender from "./loader.html";

@Component
@WithRender
class LoaderComponent extends Vue {
    classname: string = "loader";
}

export { LoaderComponent };