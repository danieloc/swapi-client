import Vue from "vue";
import Vuex from "vuex";
import { userModule } from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    users: userModule,
  },
});
