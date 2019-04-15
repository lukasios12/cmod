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

    contextLeft: number = 0;
    contextTop: number = 0;
    contextX: number = 0;
    contextY: number = 0;

    mounted() {
        let canvas = <HTMLCanvasElement><unknown>document.getElementById("editorCanvas");
        this.editor = new Editor(canvas, this.petrinet);
        this.editor.drawerOptions = this.settings;
    }

    openContextMenu(event) {
        if (this.editor) {
            let box = this.editor.clientRect;
            let drawer = this.editor.drawer;
            let point = drawer.globalToLocal(event);
            this.contextLeft = event.clientX - Math.round(box.left);
            this.contextTop = event.clientY - Math.round(box.top);
            this.contextX = point.x;
            this.contextY = point.y;
            this.showContextMenu = true;
        }
    }

    openEditMenu(event) {
        if (this.editor && !event.ctrlKey) {
            let id = this.editor.selectionId;
            let graph = this.editor.graph;
            if (graph.hasState(id)) {
                this.showEditState = true;
            } else if (graph.hasEdge(id)) {
                this.showEditEdge = true;
            }
        }
    }

    closeContextMenu() {
        this.showContextMenu = false;
    }

    closeEditStateMenu() {
        this.showEditState = false;
    }

    closeEditEdgeMenu() {
        this.showEditEdge = false;
    }

    closeMenus() {
        this.closeContextMenu();
        this.closeEditStateMenu();
        this.closeEditEdgeMenu();
        if (this.editor) {
            let canvas = this.editor.drawer.context.canvas;
            canvas.focus();
        }
    }

    get showingMenu() {
        return this.showEditState || this.showEditEdge || this.showContextMenu;
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
            this.editor.feedback = this.feedback;
        }
    }

    get settings() {
        let mod = getModule(DrawerSettingsModule, this.$store);
        return mod.settings;
    }

    @Watch('settings', {deep:true, immediate: false})
    onSettingsChange() {
        if (this.editor) {
            this.editor.drawerOptions = this.settings;
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

