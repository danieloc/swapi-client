<template>
  <div>
    <h3 class="header">Users</h3>
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
.header {
  text-align: center;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 16px;
  justify-content: center;
}
</style>
