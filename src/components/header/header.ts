import { Component, Vue } from "vue-property-decorator"; 
import WithRender from "./header.html";

@Component({
    name: "cora-header"
})
@WithRender
class Header extends Vue {
    title: string = "CoRA"
}

export { Header };