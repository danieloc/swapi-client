<template>
  <div>
    <h3>Users</h3>
    <div class="list">
      <User
        v-for="user in allUsers"
        class="user"
        :key="user.name"
        v-bind:user="user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import User from "./User.vue";

export default Vue.extend({
  name: "List",
  methods: mapActions(["fetchUsers"]),
  components: {
    User,
  },
  computed: mapGetters(["allUsers"]),
  created() {
    this.fetchUsers();
  },
});
</script>

<style lang="scss">
.list {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;

  .user {
    max-width: 400px;
  }
}
</style>
