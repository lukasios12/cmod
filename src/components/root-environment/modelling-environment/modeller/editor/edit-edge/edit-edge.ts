import { Vue, Component, Prop } from "vue-property-decorator";
import WithRender from "./edit-edge.html?style=./edit-edge.scss";

import Editor from "src/editor/editor";

@WithRender
@Component({
    name: "edit-edge"
})
export default class EditEdgeComponent extends Vue {
    @Prop(Editor) editor!: Editor;

    get label() {
        if(this.editor) {
            let id = this.editor.selectionId;
            let edge = this.editor.graph.getEdge(id);
            if (edge) {
                return edge.label;
            }
            return null;
        }
        return null;
    }

    set label(lab: string) {
        if(this.editor) {
            let id = this.editor.selectionId;
            this.editor.editEdge(id, lab);
        }
    }

    get id() {
        let id = null;
        if (this.editor) {
            id = this.editor.selectionId;
        }
        return id;
    }

    get labels() {
        let result = [];
        if (this.editor) {
            result = this.editor.petrinet.transitions.toArray();
        }
        return result;
    }

    confirm() {
        if(this.editor) {
            let label = this.label;
            this.editor.editEdge(this.editor.selectionId, label);
        }
    }
}
