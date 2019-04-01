import { Vue, Component, Watch } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import { getModule } from "vuex-module-decorators";
import SettingsModule from "src/store/settings";

import Editor from "src/editor/editor";
import DrawerOptions, { GridOptions } from "src/editor/drawer/drawer-options";

@WithRender
@Component({
    name: "editor",
})
export default class EditorComponent extends Vue {
    testProp: boolean = false;
    editor: Editor | null = null;

    mounted() {
        let canvas = <HTMLCanvasElement>document.getElementById("editorCanvas");
        let editor = new Editor(canvas);
        this.editor = editor;
    }

    get settings() {
        let mod = getModule(SettingsModule, this.$store);
        console.log(mod);
        return mod.settings;
    }

    @Watch('this.settings', {deep: true, immediate: true})
    onSettingsChange() {
        console.log("at some point");
    }
}
