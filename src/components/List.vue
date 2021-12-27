<template>
  <div>
    <div class="inputs">
      <Dropdown
        v-bind:label="'Sort'"
        :options="['Name', 'Height', 'Mass', 'Created', 'Edited', 'Planet']"
      />
      <Search :label="'Search'" v-model="searchValue" />
    </div>
    <div class="list">
      <User
        v-for="user in allUsers"
        class="user"
        :key="user.name"
        v-bind:user="user"
        v-bind:planet="usersPlanet(user.homeworldUrl)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import User from "./User.vue";
import Search from "./Search.vue";
import Dropdown from "./Dropdown.vue";

export default Vue.extend({
  name: "List",
  methods: mapActions(["fetchUsers", "fetchPlanets"]),
  components: {
    User,
    Dropdown,
    Search,
  },
  computed: {
    filteredAndSortedUsers: () => {
      //const users = []; // Call get users here
      // Filter users here, sort and return
    },
    ...mapGetters(["allUsers", "isPopupOpen", "usersPlanet"]),
  },
  created() {
    this.fetchUsers();
    this.fetchPlanets();
  },
  data: () => {
    return {
      searchValue: "",
    };
  },
});
</script>

<style lang="scss">
.inputs {
  display: flex;
  justify-content: space-around;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 16px;
  justify-content: center;
}
</style>
