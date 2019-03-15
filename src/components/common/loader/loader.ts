import { Component, Vue } from "vue-property-decorator";
import WithRender from "./loader.html?style=./loader.scss";

@Component
@WithRender
export default class LoaderComponent extends Vue {
    classname: string = "loader";
}