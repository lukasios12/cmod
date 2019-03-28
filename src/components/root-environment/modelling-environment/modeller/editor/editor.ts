import { Vue, Component } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import Editor from "src/editor/editor";

@WithRender
@Component({
    name: "editor",
})
export default class EditorComponent extends Vue {
    test: string = "some test text";
    modeller: Editor | null = null;

    mounted() {
        console.log("mounted");
        let canvas = <HTMLCanvasElement>document.getElementById("editorCanvas");
        let modeller = new Editor(canvas);
        this.modeller = modeller;
    }
}
