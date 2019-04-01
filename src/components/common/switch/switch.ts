import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import WithRender from "./switch.html?style=./switch.scss";

@WithRender
@Component({
    name: "switch-component"
})
export default class SwithComponent extends Vue {
    @Prop(Boolean)
    readonly on!: boolean;

    @Prop({ default: "on" })
    descriptionOn!: string;

    @Prop({ default: "off" })
    descriptionOff!: string;

    @Emit("switch-on")
    toOn() { console.log("turn on"); }

    @Emit("switch-off")
    toOff() { console.log("turn off"); }

    @Emit("switch-toggle")
    toggle() {
        if (this.on) {
            this.toOff();
        } else {
            this.toOn();
        }
    }

    isOn(): boolean {
        return this.on;
    }

    isOff(): boolean {
        return !this.on;
    }
}


