import Vue from "vue";
import RootEnvironment from "src/components/root-environment/root-environment";

import { Store } from "./store/store";
import { Modeller } from "./modeller/modeller";

class Main {
    public static main() {
        new Vue({
            store: Store,
            render: (h) => h(RootEnvironment),
        }).$mount("#app");
        // let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // let modeller = new Modeller(canvas);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
