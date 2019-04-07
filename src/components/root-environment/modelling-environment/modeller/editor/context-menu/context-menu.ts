import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import WithRender from "./context-menu.html?style=./context-menu.scss";

import Editor from "../editor";

@WithRender
@Component({
    name: "context-menu"
})
export default class ContextMenuComponent extends Vue {
    @Prop(Editor) editor!: Editor;

    test() {
        console.log(this.editor);
    }
}
