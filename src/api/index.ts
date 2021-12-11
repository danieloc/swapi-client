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

type ApiResponse = {
  users: User[];
  hasNext: boolean;
};

export const getUsersFromSwapi = async (
  page: number
): Promise<ApiResponse | undefined> => {
  try {
    const { data } = await axios.get<{
      results: SwapiUser[];
      next: string;
    }>(`http://swapi.dev/api/people?page=${page}`);
    return {
      users: data.results.map((user) => ({
        ...user,
        homeworldUrl: user.homeworld,
      })),
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

export const getPlanetFromSwapi = async (
  url: string
): Promise<Planet | undefined> => {
  try {
    const { data } = await axios.get<Planet>(url);
    return data;
  } catch (e) {
    console.log(
      `There was an error while trying to fetch the homeworld at url ${url}`,
      e
    );
  }
};
