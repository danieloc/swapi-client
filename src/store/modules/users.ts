import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { User } from "@/types";
import { getUsers } from "@/api/users";
import { RootState } from "../types";

Vue.use(Vuex);

export type UserState = {
  users: User[];
  totalCount: number;
  usersApiError: boolean;
};

const initState: UserState = {
  users: [],
  totalCount: 0,
  usersApiError: false,
};

const getters: GetterTree<UserState, RootState> = {
  getUsers: (state) => {
    return { users: state.users, totalCount: state.totalCount };
  },
};

const mutations: MutationTree<UserState> = {
  setUsers: (state, payload) => {
    state.users = payload;
  },

  recordErrorFetchingUser: (state) => {
    state.usersApiError = true;
  },
};

const actions: ActionTree<UserState, RootState> = {
  fetchUserId: async ({ commit }) => {
    const response = await getUsers(1);
    if (response === "ERROR") {
      return commit("recordErrorFetchingUser");
    }

    const { users, totalCount } = response;
    // TODO: Find a way to make these commits more type safe. Commit is accepting anything here. Must be more extensible way
    commit("setUsers", { users, totalCount });
  },
};

export const userModule = new Vuex.Store({
  state: initState,
  mutations,
  actions,
  getters,
  strict: true,
});
