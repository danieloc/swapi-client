<template>
  <div>
    <h3 class="header">Users</h3>
    <div class="inputs">
      <Dropdown />
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
import Dropdown from "./Dropdown.vue";

export default Vue.extend({
  name: "List",
  methods: mapActions(["fetchUsers", "fetchPlanets"]),
  components: {
    User,
    Dropdown,
  },
  computed: mapGetters(["allUsers", "isPopupOpen", "usersPlanet"]),
  created() {
    this.fetchUsers();
    this.fetchPlanets();
  },
});
</script>

<style lang="scss">
.header {
  text-align: center;
}
.inputs {
  display: flex;
  justify-content: center;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 16px;
  justify-content: center;
}
</style>
