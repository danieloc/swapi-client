import Vue from "vue";
import Vuex from "vuex";
import { user } from "./modules/users";
import { planet } from "./modules/planets";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    planet,
  },
});
