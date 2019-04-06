import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import WithRender from "./tutorial.html?style=./tutorial.scss"

@WithRender
@Component({
    name: "tutorial"
})
export default class TutorialComponent extends Vue {
    @Prop(Boolean) show!: boolean;

    @Emit('close-tutorial')
    close() {
        console.log("closing tutorial");
    }
}
