<template>
  <div id="app">
    <List />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./components/List.vue";

export default Vue.extend({
  name: "App",
  components: {
    List,
  },
});
</script>

<style lang="scss">
// Star wars font - would be better to download this and keep it in the app.
// Should really have several different font formats other than woff - but MVP.
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

body {
  font-family: Audiowide;
  color: black;
  margin-top: 60px;
  background: #060c21;
}
</style>
