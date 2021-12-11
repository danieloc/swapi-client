<template>
  <div class="user" :key="user.name">
    <div>Name: {{ user.name }}</div>
    <div>Height: {{ user.height }}</div>
    <div>Card: {{ user.mass }}</div>
    <div>Created: {{ user.created }}</div>
    <div>Edited: {{ user.edited }}</div>
    <div>
      {{
        allPlanets[user.homeworldUrl] ? allPlanets[user.homeworldUrl].name : ""
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/types";
import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "User",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  computed: mapGetters(["allPlanets"]),
});
</script>

<style scoped lang="scss">
.user {
  max-width: 400px;
  color: #fff200;
  background: black;
  position: relative;
  min-width: 100%;
}

// Straight up stole this :before and :after from here -> https://codepen.io/sam_garcia2/pen/gOaMpYo
.user:before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -1;
}

.user:after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -2;
  filter: blur(40px);
}

.user:before,
.user:after {
  background: linear-gradient(235deg, #2196f3, #010615, #f00000);
}
</style>
