import { Vue, Component, Prop } from "vue-property-decorator";
import WithRender from "./edit-edge.html?style=./edit-edge.scss";

@WithRender
@Component({
    name: "edit-edge"
})
export default class EditEdgeComponent extends Vue {

}
