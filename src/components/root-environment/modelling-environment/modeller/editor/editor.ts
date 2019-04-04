import { Vue, Component, Watch } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import { getModule } from "vuex-module-decorators";
import DrawerSettingsModule from "src/store/drawer-settings";
import ModellerModule from "src/store/modeller";
import PetrinetModule from "src/store/petrinet";
import FeedbackModule from "src/store/feedback";

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
        let editor = new Editor(canvas, this.petrinet);
        this.editor = editor;

        let settings = this.settings;
        this.editor.setSettings(settings);
    }

    get petrinet() {
        let mod = getModule(PetrinetModule, this.$store);
        return mod.petrinet;
    }

    get feedback() {
        let mod = getModule(FeedbackModule, this.$store);
        return mod.feedback;
    }

    get settings() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings;
    }

    get isResizing() {
        let mod = getModule(ModellerModule, this.$store);
        return mod.resizing;
    }

    @Watch('petrinet', {deep: true, immediate: false})
    onPetrinetChange() {
        let mod = getModule(PetrinetModule, this.$store);
        if (this.editor) {
            this.editor.petrinet = mod.petrinet;
        }
    }

    @Watch('feedback', {deep: true, immediate: false})
    onFeedbackChange() {
        let feedback = this.feedback;
        console.log(feedback);
        if (this.editor) {
             this.editor.setFeedback(feedback);
        }
    }

    @Watch('settings', {deep: true, immediate: false})
    onSettingsChange() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        if (this.editor) {
            this.editor.setSettings(mod.settings);
        }
    }

    @Watch('isResizing', {deep: true, immediate: false})
    onResizeChange() {
        let mod = getModule(ModellerModule, this.$store);
        if (this.editor) {
            this.editor.resize();
        }
    }
}
