import { Component, Vue } from "vue-property-decorator";
import WithRender from "./footer.html?style=./footer.scss";

@Component({
    name: "root-footer"
})
@WithRender
export default class FooterComponent extends Vue {

}