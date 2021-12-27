<template>
  <div class="search-container">
    <h3 class="label">{{ label }}:</h3>
    <input
      class="search"
      v-model="value"
      placeholder="None"
      v-on:input="$emit('input', $event.target.value)"
      type="string"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Search",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;

  .label {
    margin: auto 20px auto 0;
  }

  .search {
    // Removes OS styling. Use custom chevron.
    appearance: none;
    outline: 0;

    padding: 16px 32px;
    display: block;
    width: 136px;
    border-radius: 5px;
  }
}
</style>
