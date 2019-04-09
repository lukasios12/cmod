import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import WithRender from "./edit-state.html?style=./edit-state.scss";

import { getModule } from "vuex-module-decorators";
import PetrinetModule from "src/store/petrinet";

import Editor from "src/editor/editor";
import Marking from "src/system/marking";
import OmegaTokenCount from "src/system/tokens/omega-token-count";
import IntegerTokenCount from "src/system/tokens/integer-token-count";

@WithRender
@Component({
    name: "edit-state"
})
export default class EditStateComponent extends Vue {
    @Prop(Editor) editor!: Editor;

    inc(val: string) {
        if (this.isNum(val)) {
            let a = Number(val);
            return (a + 1).toString();
        }
        return val;
    }

    dec(val: string) {
        if (this.isNum(val)) {
            let a = Number(val);
            return (a - 1).toString();
        }
        return val;
    }

    omega() {
        return new OmegaTokenCount();
    }

    get petrinet() {
        return this.editor.petrinet;
    }

    get places() {
        let mod = getModule(PetrinetModule, this.$store);
        let petrinet = mod.petrinet;
        let places = petrinet.places;
        return places.toArray();
    }

    get state() {
        if (this.editor) {
            let id = this.editor.selectionId;
            let graph = this.editor.graph;
            let state = graph.getState(id);
            return state;
        }
        return null;
    }

    get list() {
        let list = [];
        if (this.editor && this.state) {
            let places = this.places;
            for (let i = 0; i < places.length; i++) {
                let place = places[i];
                let tokens = this.state.get(place);
                let value = tokens.toString();
                let item = {place: places[i], value: value};
                list.push(item);
            }
        }
        return list;
    }

    confirm() {
        let replacement = new Marking(this.petrinet);
        let list = this.list;
        for (let i = 0; i < list.length; i++) {
            let place = list[i].place;
            let tokenString = list[i].value;
            let numerical = /^-?[0-9]+$/.test(tokenString);
            let tokens;
            if (this.isNum(tokenString)) {
                let count = Math.max(0, Number(tokenString));
                tokens = new IntegerTokenCount(count);
            } else {
                tokens = new OmegaTokenCount();
            }
            replacement.set(place, tokens);
        }
        this.editor.editState(this.editor.selectionId, replacement);
    }

    protected isNum(val: string) {
        return /^-?[0-9]*$/.test(val);
    }
}
