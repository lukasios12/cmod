import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import WithRender from "./edit-state.html?style=./edit-state.scss";

import { getModule } from "vuex-module-decorators";
import PetrinetModule from "src/store/petrinet";

import Editor from "src/editor/editor";

@WithRender
@Component({
    name: "edit-state"
})
export default class EditStateComponent extends Vue {
    @Prop(Editor) editor!: Editor;

    get places() {
        let mod = getModule(PetrinetModule, this.$store);
        let petrinet = mod.petrinet;
        let places = petrinet.places;
        return places.toArray();
    }

    get state() {
        let id = this.editor.selectionId;
        let graph = this.editor.graph;
        let state = graph.getState(id);
        return state;
    }
}
