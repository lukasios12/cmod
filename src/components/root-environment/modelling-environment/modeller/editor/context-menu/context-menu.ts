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

    @Emit('close')
    close() { }

    addState() {
        let state = new Marking(this.editor.petrinet);
        this.editor.addState(state);
        this.close();
    }
}
