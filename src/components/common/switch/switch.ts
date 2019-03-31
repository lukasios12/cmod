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
    @Prop({ default: SwitchState.OFF })
    readonly current!: SwitchState;

    @Prop({ default: "on" })
    descriptionOn!: string;

    @Prop({ default: "off" })
    descriptionOff!: string;

    @Emit("switch-on")
    toOn() { }

    @Emit("switch-off")
    toOff() { }

    @Emit("switch-toggle")
    toggle() {
        if (this.current === SwitchState.ON) {
            this.toOff();
        } else {
            this.toOn();
        }
    }

    isOn(): boolean {
        return this.current == SwitchState.ON;
    }

    isOff(): boolean {
        return this.current == SwitchState.OFF;
    }
}


