<template>
  <div class="dropdown-container">
    <h3 class="label">{{ label }}:</h3>
    <select class="dropdown" v-model="selected">
      <option :default="true" :selected="true" value="None">None</option>
      <option
        v-bind:key="option"
        v-for="option in options"
        v-bind:value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Dropdown",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      selected: "None",
    };
  },
});
</script>

<style lang="scss" scoped>
.dropdown-container {
  display: flex;

  .label {
    margin: auto 20px auto 0;
  }

  .dropdown {
    // Removes OS styling. Use custom chevron.
    appearance: none;
    outline: 0;

    // Custom Chevron
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;

    padding: 16px 32px;
    display: block;
    width: 200px;
    border-radius: 5px;
  }
}
</style>
