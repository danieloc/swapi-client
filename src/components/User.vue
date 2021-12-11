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
  background: linear-gradient(235deg, #2196f3, #010615, #f00000);
  max-width: 400px;
}
</style>
