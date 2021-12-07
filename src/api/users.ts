import axios from "axios";

type UserResponse = {
  count: number;
  results: User[];
};

type User = {
  name: string;
  height: string;
  mass: number;
  created: Date;
  edited: Date;
  planetName: string;
};

export const getUsers = async (page: number) => {
  try {
    await axios.get<UserResponse>(`http://swapi.dev/api/people?page=${page}`);
  } catch (e) {
    // TODO: Add an error state for failing to fetch people
  }
};
