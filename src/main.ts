import Vue from "vue";
import RootEnvironment from "src/components/root-environment/root-environment";

import Store from "./store/store";

class Main {
    public static main() {
        new Vue({
            store: Store,
            render: (h) => h(RootEnvironment),
        }).$mount("#app");
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
