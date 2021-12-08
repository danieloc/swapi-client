import { Planet } from "@/types";
import axios from "axios";

type SwapiUser = {
  name: string;
  height: string;
  mass: number;
  created: Date;
  edited: Date;
  homeworld: string;
};

type ApiResponse = {
  totalCount: number;
  users: SwapiUser[];
};

export const getUsersFromSwapi = async (
  page: number
): Promise<ApiResponse | "ERROR"> => {
  try {
    const { data } = await axios.get<{
      count: number;
      results: SwapiUser[];
    }>(`http://swapi.dev/api/people?page=${page}`);
    return { totalCount: data.count, users: data.results };
  } catch (e) {
    console.log(
      "There was an error while trying to fetch the users from swapi.",
      e
    );
    return "ERROR";
  }
};

export const getPlanetFromSwapi = async (
  url: string
): Promise<Planet | "ERROR"> => {
  try {
    const { data } = await axios.get<Planet>(url);
    return data;
  } catch (e) {
    console.log(
      `There was an error while trying to fetch the homeworld at url ${url}`,
      e
    );
    return "ERROR";
  }
};
