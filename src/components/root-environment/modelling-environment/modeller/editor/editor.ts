import { Vue, Component, Watch } from "vue-property-decorator";
import WithRender from "./editor.html?style=./editor.scss";

import { getModule } from "vuex-module-decorators";
import DrawerSettingsModule from "src/store/drawer-settings";
import ModellerModule from"src/store/modeller"
import PetrinetModule from "src/store/petrinet";
import FeedbackModule from "src/store/feedback";

import ContextMenuComponent from "./context-menu/context-menu";
import MessengerComponent from "./messenger/messenger";
import EditStateComponent from "./edit-state/edit-state";
import EditEdgeComponent from "./edit-edge/edit-edge";

import Editor from "src/editor/editor";

@WithRender
@Component({
    name: "editor",
    components: {
        "context-menu": ContextMenuComponent,
        "messenger": MessengerComponent,
        "edit-state": EditStateComponent,
        "edit-edge": EditEdgeComponent,
    }
})
export default class EditorComponent extends Vue {
    editor: Editor | null = null;
    showContextMenu: boolean = false;
    showEditState: boolean = false;
    showEditEdge: boolean = false;

    mounted() {
        let canvas = <HTMLCanvasElement><unknown>document.getElementById("editorCanvas");
        this.editor = new Editor(canvas, this.petrinet);
        this.editor.setSettings(this.settings);

        canvas.addEventListener("mousedown", (event) => {
            if (event.buttons === 2) {
                this.toggleContext();
            }
        });
    }

    openEditMenu() {
        if (this.editor) {
            let id = this.editor.selectionId;
            let graph = this.editor.graph;
            if (graph.hasState(id)) {
                this.showEditState = true;
            } else if (graph.hasEdge(id)) {
                this.showEditEdge = true;
            }
        }
    }

    closeEditMenu() {
        this.showEditState = false;
        this.showEditEdge = false;
    }

    get showMenu() {
        return this.showEditState || this.showEditEdge;
    }

    toggleContext() {
        this.showContextMenu = !this.showContextMenu;
    }

    get hoverId() {
        if (this.editor) {
            return this.editor.hoverId;
        }
        return null;
    }

    get petrinet() {
        let mod = getModule(PetrinetModule, this.$store);
        return mod.petrinet;
    }

    @Watch('petrinet', {deep: true, immediate: false})
    onPetrinetChange() {
        if (this.editor) { 
            this.editor.petrinet = this.petrinet;
        }
    }

    get feedback() {
        let mod = getModule(FeedbackModule, this.$store);
        return mod.feedback;
    }

    @Watch('feedback', {deep: true, immediate: false})
    onFeedbackChange() {
        if (this.editor) {
            this.editor.setFeedback(this.feedback);
        }
    }

    get settings() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings;
    }

    @Watch('settings', {deep:true, immediate: false})
    onSettingsChange() {
        if (this.editor) {
            this.editor.setSettings(this.settings);
        }
    }

    get isResizing() {
        let mod = getModule(ModellerModule, this.$store);
        return mod.resizing;
    }

    @Watch('isResizing', {deep: true, immediate: false})
    onResizeChange() {
        if (this.editor) {
            this.editor.resize();
        }
    }
}

