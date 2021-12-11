<template>
  <div id="app">
    <Popup v-if="isPopupOpen" />
    <List />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import List from "./components/List.vue";
import Popup from "./components/Popup.vue";

export default Vue.extend({
  name: "App",
  components: {
    List,
    Popup,
  },
  computed: mapGetters(["isPopupOpen"]),
});
</script>

<style lang="scss">
// Star wars font - would be better to download this and keep it in the app.
// Should really have several different font formats other than woff - but MVP.
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

body {
  margin: 0;
  font-family: Audiowide;
  color: black;
  margin-top: 60px;
  background: #060c21;
  color: #fff200;
}
</style>
