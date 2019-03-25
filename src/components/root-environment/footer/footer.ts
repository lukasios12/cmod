import { Component, Vue } from "vue-property-decorator";
import WithRender from "./footer.html?style=./footer.scss";

@WithRender
@Component({
    name: "root-footer"
})
export default class FooterComponent extends Vue {

}
