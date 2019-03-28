import { Vue, Component } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

@WithRender
@Component({
    name: "editor",
})
export default class Editor extends Vue {
    test: string = "some test text";
}
