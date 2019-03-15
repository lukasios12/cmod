import { Component, Vue } from "vue-property-decorator"; 
import WithRender from "./header.html?style=./header.scss";

@Component({
    name: "modeller-header"
})
@WithRender
export default class HeaderComponent extends Vue {
    title: string = "CoRA"
}