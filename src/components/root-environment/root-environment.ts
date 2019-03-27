import { Component, Vue } from "vue-property-decorator";
import WithRender from "./root-environment.html?style=./root-environment.scss";

import InitEnvironment from "./init-environment/init-environment";
import ModellingEnvironment from "./modelling-environment/modelling-environment";
import FooterComponent from "./footer/footer";

import { getModule } from "vuex-module-decorators";
import UserModule from "src/store/user/user";

@WithRender
@Component({
    name: "root-environment",
    components: {
        "init-environment": InitEnvironment,
        "modelling-environment": ModellingEnvironment,
        "footer-component": FooterComponent
    }
})
export default class RootEnvironment extends Vue {
    components = [
        InitEnvironment,
        ModellingEnvironment,
        FooterComponent
    ];

    get current() {
        let mod = getModule(UserModule, this.$store);
        if (mod.userId === null || mod.sessionId === null || mod.petrinetId === null) {
            return InitEnvironment;
        } else {
            return ModellingEnvironment;
        }
    }
}
