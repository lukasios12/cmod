import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import WithRender from "./edit-edge.html?style=./edit-edge.scss";

import { getModule } from "vuex-module-decorators";
import PetrinetModule from "src/store/petrinet";

import Editor from "src/editor/editor";

@WithRender
@Component({
    name: "edit-edge"
})
export default class EditEdgeComponent extends Vue {
    @Prop(Editor) editor!: Editor;

    label: string | null = null;
    labels: string[] | null = null;

    @Emit('close')
    confirm() {
        let id = this.id;
        if (id !== null && this.label !== null) {
            this.editor.editEdge(id, this.label);
        }
    }

    @Emit('close')
    cancel() {
        this.setLabel();
    }

    get id() {
        if (this.editor && this.editor.selectionId &&
            this.editor.graph.hasEdge(this.editor.selectionId)) {
            return this.editor.selectionId;
        }
        return null;
    }

    @Watch('id', {deep: true, immediate: true})
    onSelectionChange() {
        this.setLabel();
    }

    get petrinet() {
        let module = getModule(PetrinetModule, this.$store);
        return module.petrinet;
    }

    @Watch('petrinet', {deep: true, immediate: true})
    onPetrinetChange() {
        let petrinet = this.petrinet;
        let transitions = petrinet.transitions.toArray();
        this.labels = transitions;
    }

    protected setLabel() {
        let id = this.id;
        if (id !== null) {
            let graph = this.editor.graph;
            let edge = graph.getEdge(id);
            this.label = edge.label;
        }
    }
}
