import RootEnvironment from "src/components/root-environment/root-environment";

import Store from "./store/store";

class Main {
    public static main() {
        new RootEnvironment({
            el: "#app",
            store: Store,
        });
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
