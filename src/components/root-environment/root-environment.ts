import { Component, Vue } from "vue-property-decorator";
import WithRender from "./root-environment.html?style=./root-environment.scss";

import InitEnvironment from "./init-environment/init-environment";
import ModellingEnvironment from "./modelling-environment/modelling-environment";
import FooterComponent from "./footer/footer";

import { State, Getter, Mutation, Action, namespace } from "vuex-class";

@Component({
    name: "root-environment",
    components: {
        "init-environment": InitEnvironment,
        "modelling-environment": ModellingEnvironment,
        "footer-component": FooterComponent
    }
})
@WithRender
export default class RootEnvironment extends Vue {
    components = [
        InitEnvironment,
        ModellingEnvironment,
    ];
    get current() {
        return InitEnvironment;
    }
}
