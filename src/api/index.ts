import { Planet } from "@/types";
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
  totalCount: number;
  partialUsers: SwapiUser[];
};

export const getUsersFromSwapi = async (
  page: number
): Promise<ApiResponse | undefined> => {
  try {
    const { data } = await axios.get<{
      count: number;
      results: SwapiUser[];
    }>(`http://swapi.dev/api/people?page=${page}`);
    return { totalCount: data.count, partialUsers: data.results };
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
