<template>
  <tr class="user" :key="user.name">
    <td>{{ user.name }}</td>
    <td>{{ user.height }}</td>
    <td>{{ user.mass }}</td>
    <td>{{ user.created }}</td>
    <td>{{ user.edited }}</td>
    <td>
      {{
        allPlanets[user.homeworldUrl] ? allPlanets[user.homeworldUrl].name : ""
      }}
    </td>
  </tr>
</template>

<script lang="ts">
import { User } from "@/types";
import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
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
//Styles
</style>
