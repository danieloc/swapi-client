import { getAllUsersFromSwapi, getAllPlanetsFromSwapi } from "@/api";
import { ActionTree } from "vuex";
import { State } from ".";

export const actions: ActionTree<State, unknown> = {
  fetchUsers: async ({ commit }) => {
    try {
      const users = await getAllUsersFromSwapi();

      commit("setUsers", { users });
    } catch (error) {
      commit("recordError");
    }
  },

  fetchPlanets: async ({ commit }) => {
    try {
      const planets = await getAllPlanetsFromSwapi();
      commit("setPlanets", { planets });
    } catch (error) {
      commit("recordError");
    }
  },

  openPopup: ({ commit }, url) => {
    commit("setPopupOpen", url);
  },

  closePopup: ({ commit }) => {
    commit("setPopupClosed");
  },
};
