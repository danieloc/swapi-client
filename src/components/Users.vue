<template>
  <div>
    <h3>Users</h3>
    <table>
      <tr>
        <th>Name</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Created</th>
        <th>Edited</th>
        <th>Planet Name</th>
      </tr>
      <tr v-for="user in allUsers" class="user" :key="user.name">
        <td>{{ user.name }}</td>
        <td>{{ user.height }}</td>
        <td>{{ user.mass }}</td>
        <td>{{ user.created }}</td>
        <td>{{ user.edited }}</td>
        <td>{{ JSON.stringify(allPlanets) }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Users",
  methods: mapActions(["fetchUsers"]),
  computed: mapGetters(["allUsers", "allPlanets"]),
  created() {
    this.fetchUsers();
  },
});
</script>

<style scoped lang="scss">
//Styles
</style>
