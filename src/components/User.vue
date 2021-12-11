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
    <div>
      <span class="label">Planet:</span>
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
import { formatDistance } from "date-fns";

export default Vue.extend({
  name: "User",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  computed: mapGetters(["allPlanets"]),
  filters: {
    formatDistance: (value: string) => {
      console.log("Converting");
      return formatDistance(new Date(value), new Date());
    },
  },
});
</script>

<style scoped lang="scss">
.user-container {
  max-width: 400px;
  background: black;
  position: relative;
  width: 300px;
  margin: 16px;

  .label {
    color: white;
  }
}

// Straight up stole this :before and :after from here -> https://codepen.io/sam_garcia2/pen/gOaMpYo
.user-container:before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: #fff;
  z-index: -1;
}

.user-container:after {
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

.user-container:before,
.user-container:after {
  background: linear-gradient(235deg, #2196f3, #010615, #f00000);
}
</style>
