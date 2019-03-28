import { Vue, Component } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import Modeller from "src/modeller/modeller";

@WithRender
@Component({
    name: "editor",
})
export default class Editor extends Vue {
    test: string = "some test text";
    modeller: Modeller | null = null;

    mounted() {
        console.log("mounted");
        let canvas = <HTMLCanvasElement>document.getElementById("editorCanvas");
        let modeller = new Modeller(canvas);
        this.modeller = modeller;
    }
}
