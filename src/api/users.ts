import axios from "axios";
import { User } from "../types";

type UserResponse = {
  count: number;
  results: User[];
};

export const getUsers = async (page: number) => {
  try {
    await axios.get<UserResponse>(`http://swapi.dev/api/people?page=${page}`);
  } catch (e) {
    // TODO: Add an error state for failing to fetch people
  }
};
