import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { Planet, User } from "@/types";
import { getUsersFromSwapi, getPlanetFromSwapi } from "@/api/users";

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
  getUsers: (state) => state.users,
  getPlanet: (state, url) => state.planets[url],
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

const actions: ActionTree<UserState, unknown> = {
  fetchUsers: async ({ commit, getters }) => {
    const response = await getUsersFromSwapi(1);
    if (response === "ERROR") {
      return commit("recordErrorFetchingUser");
    }

    const { users, totalCount } = response;

    // TODO: Find a way to make these commits typed. Commit is accepting anything here. Must be more extensible way
    commit("setUsers", { users, totalCount });
  },
  fetchPlanet: async ({ commit }, url: string) => {
    const response = await getPlanetFromSwapi(url);
    if (response === "ERROR") {
      return commit("recordErrorFetchingPlanet");
    }

    commit("addPlanet", { url, planet: response });
  },
};
export const store = new Vuex.Store({
  state: initState,
  actions,
  getters,
  mutations,
});
