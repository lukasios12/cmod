import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import WithRender from "./context-menu.html?style=./context-menu.scss";

import Editor from "src/editor/editor";
import Marking from "src/system/marking";

@WithRender
@Component({
    name: "context-menu"
})
export default class ContextMenuComponent extends Vue {
    @Prop(Editor) editor!: Editor;
    @Prop(Number) left!: number;
    @Prop(Number) top!: number;

    get styleObject() {
        return {
            left: this.left.toString() + "px",
            top: this.top.toString() + "px",
        };
    }

    @Emit('close')
    addState() {
        console.log(this.top, this.left);
        if (this.editor !== null) {
            let state = new Marking(this.editor.petrinet);
            this.editor.addState(state);
        }
    }

    @Emit('close')
    setInitial() {
        if (this.stateSelected) {
            this.editor.setInitial(this.id);
        }
    }

    @Emit('close')
    deleteElement() {
        if (this.stateSelected) {
            this.editor.delState(this.id);
        } else if (this.edgeSelected) {
            this.editor.delEdge(this.id);
        }
    }

    @Emit('close')
    editElement() {
        if (this.stateSelected) {
            this.$emit('edit-state');
        } else if (this.edgeSelected) {
            this.$emit('edit-edge');
        }
    }

    get id() {
        if (this.editor && this.editor.selectionId) {
            return this.editor.selectionId;
        }
        return null;
    }

    get stateSelected() {
        return this.id && this.editor.graph.hasState(this.id);
    }

    get edgeSelected() {
        return this.id && this.editor.graph.hasEdge(this.id);
    }
}
