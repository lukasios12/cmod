import { Modeller } from "./modeller/modeller"
import { Session } from "./services/session-service";
import { Config } from "./services/config-service";

import Vue from "vue";
import RootEnvironment from "src/components/root-environment/root-environment";

class Main {
    public static main() {
        new Vue({
            render: (h) => h(RootEnvironment)
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
