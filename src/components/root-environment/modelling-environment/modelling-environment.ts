import { Component, Vue } from "vue-property-decorator";
import WithRender from "./modelling-environment.html?style=./modelling-environment.scss";

import HeaderComponent from "./header/header";
import MenuComponent from "./menu/menu";
import MenuToggleComponent from "./menu-toggle/menu-toggle";
import ModellerComponent from "./modeller/modeller";
import TutorialComponent from "./tutorial/tutorial";

@WithRender
@Component({
    components: {
        "modeller-environment": ModellerComponent,
        "modeller-header": HeaderComponent,
        "modeller-menu": MenuComponent,
        "modeller-menu-toggle": MenuToggleComponent,
        "modeller-tutorial": TutorialComponent,
    },
})
export default class ModellingEnvironment extends Vue {
    menuOpen: boolean = false;
    showTutorial: boolean = true;

    created() {
        window.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 72:
                    this.tutorialToggle();
                break;
            }
        });
    }

    menuToggle(): void {
        this.menuOpen = !this.menuOpen;
    }

    closeTutorial(): void {
        this.showTutorial = false;
    }

    tutorialToggle() {
        this.showTutorial = !this.showTutorial;
    }
}
