import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserModule from "./user";
import SettingsModule from "./settings";

export const Store = new Vuex.Store({
    modules: {
        UserModule,
        SettingsModule
    }
});
