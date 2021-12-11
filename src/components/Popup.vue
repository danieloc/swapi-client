<template>
  <div class="user-container" :key="user.name">
    <h1>Popup component</h1>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Popup",
  computed: mapGetters(["popupPlanetDetails"]),
});
</script>

<style scoped lang="scss">
</style>
