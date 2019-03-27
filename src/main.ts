import Vue from "vue";
import RootEnvironment from "src/components/root-environment/root-environment";

import { Store } from "./store/store";

class Main {
    public static main() {
        new Vue({
            store: Store,
            render: (h) => h(RootEnvironment),
        }).$mount("#app");
        // let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        // let config = Config.getInstance();
        // config.baseUrl = "http://localhost/~lucas/cora-server/api";
        // let session = Session.getInstance();
        // session.petrinetId = 70;
        // session.userId = 53;
        // session.sessionId = 0;
        // let modeller = new Modeller(canvas);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
