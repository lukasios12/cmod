import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserModule from "./user";
import PetrinetModule from "./petrinet";
import SessionModule from "./session";
import ModellerModule from "./modeller";
import DrawerSettingsModule from "./drawer-settings";

export const Store = new Vuex.Store({
    modules: {
        UserModule,
        PetrinetModule,
        SessionModule,
        ModellerModule,
        DrawerSettingsModule
    }
});
