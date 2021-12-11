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

export const getUserPageFromSwapi = async (
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



export const getAllUsersFromSwapi = async (page: number = 1): Promise<User[]> => {
  const response = await getUserPageFromSwapi(page);
  if (!response) {
    throw new Error("No user received from swapi api");
  }

  const { users, hasNext } = response;

  if(!hasNext) {
    return users
  }

  const restUsers = await getAllUsersFromSwapi(page + 1)
  return [...users, ...restUsers]
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
