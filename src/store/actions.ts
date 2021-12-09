import { getUsersFromSwapi, getPlanetFromSwapi, SwapiUser } from "@/api";
import { User } from "@/types";
import { ActionTree } from "vuex";
import { UserState } from ".";

export const actions: ActionTree<UserState, unknown> = {
  fetchUsers: async ({ commit, state }) => {
    const response = await getUsersFromSwapi(1);
    if (!response) {
      return commit("recordErrorFetchingUser");
    }

    const { partialUsers, totalCount } = response;

    const mapUserToPlanet = async (swapiUser: SwapiUser): Promise<User> => {
      const homeworldUrl = swapiUser.homeworld;
      const cachedPlanet = state.planets[homeworldUrl];
      if (cachedPlanet) {
        return {
          ...swapiUser,
          homeworld: cachedPlanet,
        };
      }

      const homeworld = await getPlanetFromSwapi(homeworldUrl);

      return {
        ...swapiUser,
        homeworld,
      };
    };

    const users = await Promise.all(partialUsers.map(mapUserToPlanet));

    // TODO: Find a way to make these commits typed. Commit is accepting anything here. Must be more extensible way
    commit("setUsers", { users, totalCount });
  },
};
