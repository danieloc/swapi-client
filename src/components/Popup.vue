<template>
  <div class="popup">
    <h1>{{ popupPlanetDetails.name }}</h1>
  </div>
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
.popup {
  position: absolute;
}
</style>
