<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Command Center</div>
      <v-spacer></v-spacer>
      <div class="mr-5">{{ $store.getters.progress }}</div>
      <v-progress-circular
        v-if="
          $store.getters.progress.length > 0 ||
          $store.getters.progress !== 'Finished'
        "
        indeterminate
      ></v-progress-circular>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
$scrollbar-bg-color: #171717;
$scrollbar-thumb-color: #898989;

html {
  background-color: black;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: $scrollbar-bg-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: $scrollbar-thumb-color;
}
</style>
