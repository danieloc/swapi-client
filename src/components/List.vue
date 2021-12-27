<template>
  <div>
    <div class="inputs">
      <Dropdown
        v-bind:label="'Sort'"
        :options="[
          { value: 'name', text: 'Name' },
          { value: 'height', text: 'Height' },
          { value: 'mass', text: 'Mass' },
          { value: 'created', text: 'Created' },
          { value: 'edited', text: 'Edited' },
          { value: 'planet', text: 'Planet' },
        ]"
        v-model="sortValue"
      />
      <Search :label="'Search'" v-model="searchValue" />
    </div>
    <div class="list">
      <UserCard
        v-for="user in filteredAndSortedUsers"
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
import UserCard from "./User.vue";
import Search from "./Search.vue";
import Dropdown from "./Dropdown.vue";
import { User } from "@/types";

export default Vue.extend({
  name: "List",
  methods: mapActions(["fetchUsers", "fetchPlanets"]),
  components: {
    UserCard,
    Dropdown,
    Search,
  },
  computed: {
    filteredAndSortedUsers: function () {
      const searchValue = this.$data.searchValue;
      const sort: keyof User = this.$data.sortValue;
      const users: User[] = this.$store.getters.allUsers;
      const filteredUsers = users.filter((user) =>
        user.name.match(searchValue)
      );

      if (!sort) {
        return filteredUsers;
      }

      return filteredUsers.sort((a: User, b: User) => {
        if (a[sort] < b[sort]) {
          return -1;
        }
        if (a[sort] > b[sort]) {
          return 1;
        }
        return 0;
      });
    },
    ...mapGetters(["isPopupOpen", "usersPlanet"]),
  },
  created() {
    this.fetchUsers();
    this.fetchPlanets();
  },
  data: () => {
    return {
      searchValue: "",
      sortValue: "",
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
