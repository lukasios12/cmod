import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserModule from "./user";
import PetrinetModule from "./petrinet";
import SessionModule from "./session";
import FeedbackModule from "./feedback";
import ModellerModule from "./modeller";
import DrawerSettingsModule from "./drawer-settings";

const Store = new Vuex.Store({
    modules: {
        UserModule,
        PetrinetModule,
        SessionModule,
        FeedbackModule,
        ModellerModule,
        DrawerSettingsModule
    }
});

export default Store;
