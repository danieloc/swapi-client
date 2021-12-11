import Vue from "vue";
import Vuex, { GetterTree, MutationTree } from "vuex";
import { Planet, User } from "@/types";
import { actions } from "./actions";

Vue.use(Vuex);

export type UserState = {
  users: User[];
  planets: {
    [key: string]: Planet;
  };
  hasError: boolean;
};

const initState: UserState = {
  planets: {},
  users: [],
  hasError: false,
};

const getters: GetterTree<UserState, unknown> = {
  allUsers: (state) => state.users,
  allPlanets: (state) => state.planets,
};

const mutations: MutationTree<UserState> = {
  setUsers: (state, payload) => {
    state.users = payload.users;
  },
  recordErrorFetchingUser: (state) => {
    state.hasError = true;
  },
  addPlanet: (state, { url, planet }) => {
    state.planets = { ...state.planets, [url]: planet };
  },
};

export const store = new Vuex.Store({
  state: initState,
  actions,
  getters,
  mutations,
});
