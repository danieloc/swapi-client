<template>
  <div class="user-container" :key="user.name">
    <div><span class="label">Name:</span> {{ user.name }}</div>
    <div><span class="label">Height:</span>{{ user.height }}</div>
    <div><span class="label">Mass:</span>{{ user.mass }}</div>
    <div>
      <span class="label">Created:</span>{{ user.created | formatDistance }}
    </div>
    <div>
      <span class="label">Edited:</span>{{ user.edited | formatDistance }}
    </div>
    <div v-if="planet">
      <span class="label">Planet:</span>
      {{ planet.name }}
      <img
        v-on:click="openPopup(user.homeworldUrl)"
        :src="mySVG"
        alt="info-icon"
        class="info-icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Planet, User } from "@/types";
import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { formatDistance } from "date-fns";

export default Vue.extend({
  name: "User",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    planet: {
      type: Object as PropType<Planet>,
    },
  },
  data: () => {
    return {
      mySVG: require("../assets/info.svg"),
    };
  },
  methods: mapActions(["openPopup"]),
  filters: {
    formatDistance: (value: string) => {
      return formatDistance(new Date(value), new Date(), {
        addSuffix: true,
      });
    },
  },
});
</script>

<style lang="scss">
.user-container {
  max-width: 400px;
  background: black;
  position: relative;
  width: 450px;
  padding: 16px;
  margin: 16px;
  // Requires this as data-fns returns lower case and it's better than a js function
  text-transform: capitalize;

  > div {
    display: flex;
    text-align: center;
  }

  .info-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: 16px;
  }

  .label {
    color: white;
  }

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #fff;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #fff;
    z-index: -2;
    filter: blur(40px);
    background: linear-gradient(235deg, #2196f3, #010615, #f00000);
  }
}
</style>
