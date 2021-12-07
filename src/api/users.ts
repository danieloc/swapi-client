import axios from "axios";
import { User } from "../types";

type ApiResponse = {
  totalCount: number;
  users: User[];
};

export const getUsers = async (
  page: number
): Promise<ApiResponse | "ERROR"> => {
  try {
    const { data } = await axios.get<{
      count: number;
      results: User[];
    }>(`http://swapi.dev/api/people?page=${page}`);
    return { totalCount: data.count, users: data.results };
  } catch (e) {
    // TODO: Add an error state for failing to fetch people
    console.log(
      "There was an error while trying to fetch the users from swapi.",
      e
    );
    return "ERROR";
  }
};
