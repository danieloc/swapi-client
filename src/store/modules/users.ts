import Vue from "vue";
import Vuex, { GetterTree, Module } from "vuex";
import { MutationTree, ActionTree } from "vuex";
import { User } from "@/types";
import { getUsers } from "@/api/users";

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

const getters: GetterTree<UserState, unknown> = {
  allUsers: (state) => state.users,
};

const mutations: MutationTree<UserState> = {
  setUsers: (state, payload) => {
    state.users = payload.users;
    state.totalCount = payload.totalCount;
  },

  recordErrorFetchingUser: (state) => {
    state.usersApiError = true;
  },
};

const actions: ActionTree<UserState, unknown> = {
  fetchUsers: async ({ commit }) => {
    const response = await getUsers(1);
    if (response === "ERROR") {
      return commit("recordErrorFetchingUser");
    }

    const { users, totalCount } = response;
    // TODO: Find a way to make these commits typed. Commit is accepting anything here. Must be more extensible way
    commit("setUsers", { users, totalCount });
  },
};

export const user: Module<UserState, unknown> = {
  state: initState,
  mutations,
  actions,
  getters,
};
