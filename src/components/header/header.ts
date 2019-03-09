import { Component, Vue } from "vue-property-decorator"; 
import WithRender from "./header.html";

@Component({
    name: "cora-header"
})
@WithRender
class HeaderComponent extends Vue {
    title: string = "CoRA"
}

export { HeaderComponent };