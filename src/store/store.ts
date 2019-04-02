import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserModule from "./user";
import ModellerModule from "./modeller";
import DrawerSettingsModule from "./drawer-settings";

export const Store = new Vuex.Store({
    modules: {
        UserModule,
        ModellerModule,
        DrawerSettingsModule
    }
});
