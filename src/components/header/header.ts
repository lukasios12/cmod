import { Component, Vue } from "vue-property-decorator"; 
import WithRender from "./header.html?style=./header.scss";

@Component({
    name: "modeller-header"
})
@WithRender
class HeaderComponent extends Vue {
    title: string = "CoRA"
}

export { HeaderComponent };