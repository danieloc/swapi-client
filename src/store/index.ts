import Vue from "vue";
import Vuex, { GetterTree, MutationTree } from "vuex";
import { Planet, User } from "@/types";
import { actions } from "./actions";

Vue.use(Vuex);

export type State = {
  users: User[];
  planets: Planet[];
  hasError: boolean;
  popup: {
    open: boolean;
    planetUrl?: string;
  };
};

const initState: State = {
  planets: [],
  users: [],
  hasError: false,
  popup: {
    open: false,
  },
};

const getters: GetterTree<State, unknown> = {
  allUsers: (state) => state.users,
  usersPlanet: (state) => (homeworldUrl: string) =>
    state.planets.find(({ url }) => url === homeworldUrl),
  isPopupOpen: (state) => state.popup.open,
  popupPlanetDetails: (state) =>
    state.planets.find(({ url }) => url === state.popup.planetUrl),
};

const mutations: MutationTree<State> = {
  setUsers: (state, payload) => {
    state.users = payload.users;
  },
  recordError: (state) => {
    state.hasError = true;
  },
  setPlanets: (state, { planets }) => {
    state.planets = planets;
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
