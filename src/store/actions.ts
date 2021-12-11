import { getUsersFromSwapi, getPlanetFromSwapi } from "@/api";
import { ActionTree } from "vuex";
import { UserState } from ".";

export const actions: ActionTree<UserState, unknown> = {
  fetchUsers: async ({ commit, state }) => {
    try {
      const response = await getUsersFromSwapi(1);
      if (!response) {
        throw new Error("No user received from swapi api");
      }

      const { users, hasNext } = response;
      commit("setUsers", { users });

      const nonCachedPlanets = users
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
    } catch (error) {
      commit("recordErrorFetchingUser");
    }
  },
};
