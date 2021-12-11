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
      <UserRow
        v-for="user in allUsers"
        class="user"
        :key="user.name"
        v-bind:user="user"
      />
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import UserRow from "./User.vue";

export default Vue.extend({
  name: "UserTable",
  methods: mapActions(["fetchUsers"]),
  components: {
    UserRow,
  },
  computed: mapGetters(["allUsers"]),
  created() {
    this.fetchUsers();
  },
});
</script>

<style scoped lang="scss">
//Styles
</style>
