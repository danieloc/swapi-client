<template>
  <div class="user-container" :key="user.name">
    <h1>Popup component</h1>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Popup",
});
</script>

<style scoped lang="scss">
</style>
