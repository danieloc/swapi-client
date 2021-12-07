import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { User } from "@/types";
import { getUsers } from "@/api/users";

Vue.use(Vuex);

type State = {
  users: User[];
};

type RootState = State;

const initState: State = {
  users: [],
};

const getters: GetterTree<State, RootState> = {
  getUsers: (state) => {
    return state.users;
  },
};

const mutations: MutationTree<State> = {
  setUsers(state, payload) {
    state.users = payload;
  },
};

const actions: ActionTree<State, RootState> = {
  fetchUserId: async () => {
    const response = await getUsers(1);
    if (response) {
    }
  },
};

export default new Vuex.Store({
  state: initState,
  mutations: mutations,
  actions: actions,
  getters,
});
