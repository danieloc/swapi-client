import { Planet, User } from "@/types";
import axios from "axios";

export type SwapiUser = {
  name: string;
  height: string;
  mass: number;
  created: Date;
  edited: Date;
  homeworld: string;
};

type PartialUserListResponse = {
  users: User[];
  hasNext: boolean;
};

export const getUserPageFromSwapi = async (
  page: number
): Promise<PartialUserListResponse | undefined> => {
  try {
    const { data } = await axios.get<{
      results: SwapiUser[];
      next: string;
    }>(`http://swapi.dev/api/people?page=${page}`);
    return {
      users: data.results.map(
        (user): User => ({
          name: user.name,
          created: user.created,
          edited: user.edited,
          height: user.height,
          mass: user.mass,
          homeworldUrl: user.homeworld,
        })
      ),
      hasNext: !!data.next,
    };
  } catch (e) {
    console.log(
      "There was an error while trying to fetch the users from swapi.",
      e
    );
    return undefined;
  }
};

export const getAllUsersFromSwapi = async (page = 1): Promise<User[]> => {
  const response = await getUserPageFromSwapi(page);
  if (!response) {
    throw new Error("No user received from swapi api");
  }

  const { users, hasNext } = response;

  if (!hasNext) {
    return users;
  }

  const restUsers = await getAllUsersFromSwapi(page + 1);
  return [...users, ...restUsers];
};

type PartialPlanetListResponse = {
  planets: Planet[];
  hasNext: boolean;
};

export const getPlanetPageFromSwapi = async (
  page: number
): Promise<PartialPlanetListResponse | undefined> => {
  try {
    const { data } = await axios.get<{
      results: Planet[];
      next: string;
    }>(`http://swapi.dev/api/planets/?page=${page}`);
    return {
      planets: data.results,
      hasNext: !!data.next,
    };
  } catch (e) {
    console.log(
      `There was an error while trying to fetch the homeworld for page ${page}`,
      e
    );
  }
};

export const getAllPlanetsFromSwapi = async (page = 1): Promise<Planet[]> => {
  const response = await getPlanetPageFromSwapi(page);
  if (!response) {
    throw new Error("No user received from swapi api");
  }

  const { planets, hasNext } = response;

  if (!hasNext) {
    return planets;
  }

  const restPlanets = await getAllPlanetsFromSwapi(page + 1);
  return [...planets, ...restPlanets];
};
