import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import SessionModule from "./session";
import ModellerModule from "./modeller";
import DrawerSettingsModule from "./drawer-settings";

export const Store = new Vuex.Store({
    modules: {
        SessionModule,
        ModellerModule,
        DrawerSettingsModule
    }
});
