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
  totalCount: number;
};

const initState: UserState = {
  planets: {},
  users: [],
  totalCount: 0,
  hasError: false,
};

const getters: GetterTree<UserState, unknown> = {
  allUsers: (state) => state.users,
};

const mutations: MutationTree<UserState> = {
  setUsers: (state, payload) => {
    state.users = payload.users;
    state.totalCount = payload.totalCount;
  },
  recordErrorFetchingUser: (state) => {
    state.hasError = true;
  },
  addPlanet: (state, { url, planet }) => {
    state.planets[url] = planet;
  },
};

export const store = new Vuex.Store({
  state: initState,
  actions,
  getters,
  mutations,
});
