import Vue from "vue";
import Vuex, { GetterTree, MutationTree } from "vuex";
import { Planet, User } from "@/types";
import { actions } from "./actions";

Vue.use(Vuex);

export type State = {
  users: User[];
  planets: {
    [key: string]: Planet;
  };
  hasError: boolean;
  popup: {
    open: boolean;
    planetUrl?: string;
  };
};

const initState: State = {
  planets: {},
  users: [],
  hasError: false,
  popup: {
    open: false,
  },
};

const getters: GetterTree<State, unknown> = {
  allUsers: (state) => state.users,
  allPlanets: (state) => state.planets,
  isPopupOpen: (state) => state.popup.open,
  popupPlanetDetails: (state) => state.planets[state.popup?.planetUrl || ""],
};

const mutations: MutationTree<State> = {
  setUsers: (state, payload) => {
    state.users = payload.users;
  },
  recordErrorFetchingUser: (state) => {
    state.hasError = true;
  },
  addPlanet: (state, { url, planet }) => {
    state.planets = { ...state.planets, [url]: planet };
  },
  setPopupOpen: (state, url) => {
    state.popup = { open: true, planetUrl: url };
  },
  setPopupClosed: (state) => {
    state.popup = { open: false };
  },
};

export const store = new Vuex.Store({
  state: initState,
  actions,
  getters,
  mutations,
});
