import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import WithRender from "./success.html";

@WithRender
@Component({
    name: "success"
})
export default class SuccessComponent extends Vue {
    @Prop(Boolean) show!: boolean;

    @Emit('close')
    close() {}
}
