import { Component, Prop, Vue } from "vue-property-decorator";
import WithRender from "./dialog.html";

@WithRender
@Component({
    props: {
        username: String
    }
})
export default class Dialog extends Vue {
    title: string = "Welcome";
    introduction: string = `
        Welcome to CoRA, the Coverability Graph Assistant.
        To get started, please pick a unique username`;
    username: string = "";
}

export { Dialog };