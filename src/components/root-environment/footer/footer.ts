import { Component, Vue } from "vue-property-decorator";
import WithRender from "./footer.html?style=./footer.scss";

@Component({
    name: "root-footer"
})
@WithRender
class FooterComponent extends Vue {

}

export { FooterComponent };