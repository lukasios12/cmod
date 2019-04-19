import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import WithRender from "./edit-state.html?style=./edit-state.scss";

import { getModule } from "vuex-module-decorators";
import PetrinetModule from "src/store/petrinet";

import Editor from "src/editor/editor";
import Marking from "src/system/marking";
import OmegaTokenCount from "src/system/tokens/omega-token-count";
import IntegerTokenCount from "src/system/tokens/integer-token-count";
import StyleManager from "src/style-manager/style-manager";

import { remainder } from "lib/math/math";

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
        if (index >= 0 && index < this.map.length) {
            this.map[index].tokens = new OmegaTokenCount().toString();
        }
    }

    next(index: number) {
        if (index >= 0 && index < this.map.length) {
            let i = remainder(index + 1, this.map.length);
            let element = <HTMLInputElement>document.getElementById(this.inputId(i));
            element.focus();
            element.select();
        }
    }

    prev(index: number) {
        if(index >= 0 && index < this.map.length) {
            let i = remainder(index - 1, this.map.length);
            let element = <HTMLInputElement>document.getElementById(this.inputId(i));
            element.focus();
            element.select();
        }
    }

    @Emit('close')
    confirm() {
        if (this.id !== null) {
            let drawer = this.editor.drawer;
            let drawing = this.editor.graphDrawing.getState(this.id);
            let position = drawer.localToGlobal(drawing.position);
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

    @Emit('close')
    cancel() {
        this.setMap();
    }

    get id() {
        if(this.editor && this.editor.selectionId &&
           this.editor.graph.hasState(this.editor.selectionId)) {
            return this.editor.selectionId;
        }
        return null;
    }

    @Watch('id', {deep: false, immediate: false})
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

    protected inputId(i: number) {
        return `edit-state-input-${i}`;
    }

    get styleObject() {
        if (this.id !== null) {
            let drawer = this.editor.drawer;
            let drawing = this.editor.graphDrawing.getState(this.id);
            let position = drawer.localToGlobal(drawing.position);
            let context = drawer.context.canvas.getContext("2d");
            let t = drawer.currentTransform;

            context.save();
            StyleManager.setStateStandardStyle(context);
            let height = drawing.getHeight(context);
            let width = drawing.getWidth(context);
            context.restore();
            let x = position.x + (width * t.get(0, 0)) / 2;
            let y = position.y + (height * t.get(1, 1));
            return {
                "left": x.toString() + "px",
                "top": y.toString() + "px",
            };
        }
        return null;
    }
}
