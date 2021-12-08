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
    </table>
    <div v-for="user in allUsers" class="user" :key="user.name">
      {{ user.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Users",
  methods: mapActions(["fetchUsers"]),
  computed: mapGetters(["allUsers"]),
  created() {
    this.fetchUsers();
  },
});
</script>

<style scoped lang="scss">
//Styles
</style>
