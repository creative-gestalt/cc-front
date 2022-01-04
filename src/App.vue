<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row align="center" justify="center">
        <v-col cols="5">
          <div class="d-flex align-center">Command Center</div>
        </v-col>
        <v-col cols="1" class="mr-n10 ml-10">
          <v-progress-circular
            v-if="$store.getters.progress.length > 0"
            indeterminate
          ></v-progress-circular>
        </v-col>
        <v-col cols="6">
          <div class="text-left">{{ $store.getters.progress }}</div>
        </v-col>
      </v-row>
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
