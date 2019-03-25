import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserModule from "./user/user";

export const Store = new Vuex.Store({
    modules: {
        UserModule
    }
});
