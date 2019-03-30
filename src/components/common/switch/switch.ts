import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import WithRender from "./switch.html?style=./switch.scss";

enum SwitchState {
    ON,
    OFF
}

@WithRender
@Component({
    name: "switch-component"
})
export default class SwithComponent extends Vue {
    @Prop({ default: SwitchState.ON })
    readonly current!: SwitchState;

    @Prop({ default: "on" })
    descriptionOn!: string;

    @Prop({ default: "off" })
    descriptionOff!: string;

    @Emit("switch-on")
    toOn() {
        console.log("turn on");
    }

    @Emit("switch-off")
    toOff() {
        console.log("turn off");
    }

    @Emit("switch-toggle")
    toggle() {

    }
}


