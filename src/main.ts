import Vue from "vue";
import RootEnvironment from "src/components/root-environment/root-environment";

import Store from "./store/store";

class Main {
    public static main() {
        if (PRODUCTION) {
            Vue.config.silent = true;
            Vue.config.devtools = false;
            Vue.config.performance = false;
            Vue.config.productionTip = false;
        }

        console.log(API_URL, PRODUCTION, DEVELOPMENT, SHOW_SUCCESS_MESSAGE, QUESTIONNAIRE_URL, SHOW_QUESTIONNAIRE_MESSAGE);
        new RootEnvironment({
            el: "#app",
            store: Store,
        });
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
