<template>
  <div>
    <div class="popup">
      <div class="close" v-on:click="closePopup">X</div>
      <p><span class="label">Name:</span> {{ popupPlanetDetails.name }}</p>
      <p>
        <span class="label">Diameter:</span> {{ popupPlanetDetails.diameter }}
      </p>
      <p>
        <span class="label">Climate:</span> {{ popupPlanetDetails.climate }}
      </p>
      <p>
        <span class="label">Population:</span>
        {{ popupPlanetDetails.population }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Popup",
  computed: mapGetters(["popupPlanetDetails"]),
  methods: mapActions(["closePopup"]),
});
</script>
<style scoped lang="scss">
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  color: black;
  text-transform: capitalize;
  padding: 16px;
}

.close {
  width: fit-content;
  margin: 0 0 16px auto;
  cursor: pointer;
}
</style>
