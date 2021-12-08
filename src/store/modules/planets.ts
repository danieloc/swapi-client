import Vue from "vue";
import Vuex, { GetterTree, Module } from "vuex";
import { MutationTree, ActionTree } from "vuex";
import { getPlanetFromSwapi } from "@/api/users";
import { Planet } from "@/types";

Vue.use(Vuex);

export type PlanetState = {
  planets: {
    [key: string]: Planet;
  };
  hasError: boolean;
};

const initState: PlanetState = {
  planets: {},
  hasError: false,
};

const getters: GetterTree<PlanetState, unknown> = {
  getPlanet: (state, url) => state.planets[url],
};

const mutations: MutationTree<PlanetState> = {
  addPlanet: (state, { url, planet }) => {
    state.planets[url] = planet;
  },
  recordErrorFetchingPlanet: (state) => {
    state.hasError = true;
  },
};

const actions: ActionTree<PlanetState, unknown> = {
  fetchPlanet: async ({ commit, getters }, url: string) => {
    const response = await getPlanetFromSwapi(url);
    if (response === "ERROR") {
      return commit("recordErrorFetchingPlanet");
    }

    commit("addPlanet", { url, planet: response });
  },
};

export const planet: Module<PlanetState, unknown> = {
  state: initState,
  mutations,
  actions,
  getters,
};
