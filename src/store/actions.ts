import { getAllUsersFromSwapi, getPlanetFromSwapi } from "@/api";
import { ActionTree } from "vuex";
import { UserState } from ".";

export const actions: ActionTree<UserState, unknown> = {
  fetchUsers: async ({ commit, dispatch }) => {
    try {
      const users = await getAllUsersFromSwapi();

      commit("setUsers", { users });

      dispatch("fetchPlanets");
    } catch (error) {
      commit("recordErrorFetchingUser");
    }
  },

  fetchPlanets: async ({ state, commit }) => {
    const nonCachedPlanets = state.users
      .map(({ homeworldUrl }) => homeworldUrl)
      .filter((url) => !state.planets[url]);

    // Removes duplicate urls
    const uniqueNonCachedPlanets = [...new Set(nonCachedPlanets)];

    await Promise.all(
      uniqueNonCachedPlanets.map(async (planetUrl) => {
        const planet = await getPlanetFromSwapi(planetUrl);
        if (!planet) {
          throw new Error("Failed to retrieve planet");
        }

        commit("addPlanet", { url: planetUrl, planet });
      })
    );
  },
};
