<template>
  <div>
    <h3>Users</h3>
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
