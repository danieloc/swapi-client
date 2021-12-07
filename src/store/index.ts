import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { User } from "@/types";
import { getUsers } from "@/api/users";

Vue.use(Vuex);

type State = {
  users: User[];
  totalCount: number;
  usersApiError: boolean;
};

type RootState = State;

const initState: State = {
  users: [],
  totalCount: 0,
  usersApiError: false,
};

const getters: GetterTree<State, RootState> = {
  getUsers: (state) => {
    return { users: state.users, totalCount: state.totalCount };
  },
};

const mutations: MutationTree<State> = {
  setUsers: (state, payload) => {
    state.users = payload;
  },

  recordErrorFetchingUser: (state) => {
    state.usersApiError = true;
  },
};

const actions: ActionTree<State, RootState> = {
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

export default new Vuex.Store({
  state: initState,
  mutations,
  actions,
  getters,
});
