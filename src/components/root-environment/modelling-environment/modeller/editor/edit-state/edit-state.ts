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

    map = [];

    dec(index: number) {
        if (index >= 0 && index < this.map.length) {
            let val = this.map[index].tokens;
            if (this.isNum(val)) {
                let num = Math.max(0, Number(val) - 1);
                this.map[index].tokens = num.toString();
            }
        }
    }

    inc(index: number) {
        if (index >= 0 && index < this.map.length) {
            let val = this.map[index].tokens;
            if (this.isNum(val)) {
                let num = Math.max(0, Number(val) + 1);
                this.map[index].tokens = num.toString();
            }
        }
    }

    omega(index: number) {
        if (index >= 0 && this.map.length) {
            this.map[index].tokens = new OmegaTokenCount().toString();
        }
    }

    confirm() {
        if (this.id !== null) {
            let marking = new Marking(this.editor.petrinet);
            for(let i = 0; i < this.map.length; i++) {
                let record = this.map[i];
                let place  = record.place;
                let tokens = record.tokens;
                if (this.isNum(tokens)) {
                    let num = Math.max(0, Number(tokens));
                    tokens = new IntegerTokenCount(num);
                } else {
                    tokens = new OmegaTokenCount();
                }
                marking.set(place, tokens);
            }
            this.editor.editState(this.id, marking);
        }
    }

    cancel() {
        this.setMap();
    }

    get id() {
        if(this.editor) {
            return this.editor.selectionId;
        }
        return null;
    }

    @Watch('id', {deep: true, immediate: true})
    onSelectionChange() {
        this.setMap();
    }

    get petrinet() {
        let module = getModule(PetrinetModule, this.$store);
        return module.petrinet;
    }

    protected isNum(val: string) {
        return /^-?[0-9]*$/.test(val);
    }

    protected createRecord(place: string, tokens: string) {
        return {place: place, tokens: tokens};
    }

    protected setMap() {
        this.map = [];
        if (this.id !== null) {
            this.map = [];
            let graph = this.editor.graph;
            let state = graph.getState(this.id);
            let net = this.petrinet;
            let places = net.places.toArray();
            for(let i = 0; i < places.length; i++) {
                let tokenString = state.get(places[i]).toString();
                this.map.push(this.createRecord(places[i], tokenString));
            }
        }
    }
}
