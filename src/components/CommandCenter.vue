<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="4">
        <v-card>
          <v-card-title>Deploy CommandCenter</v-card-title>
          <v-card-actions>
            <v-btn
              @click="deployCommandCenter"
              :loading="commandCenterLoading"
              width="100%"
            >
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Deploy DreamScape</v-card-title>
          <v-card-actions>
            <v-btn
              @click="deployDreamscape"
              :loading="dreamscapeLoading"
              width="100%"
            >
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Deploy BillTracker</v-card-title>
          <v-card-actions>
            <v-btn width="100%">deploy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-title>Create Service</v-card-title>
          <v-text-field
            v-model="newService.name"
            placeholder="Service Name"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newService.workdir"
            placeholder="Working Directory"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newService.package"
            placeholder="Package Name 'npm' or 'serve'"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newService.frontPort"
            placeholder="Frontend Port"
            outlined
            dense
          ></v-text-field>
          <v-card-actions>
            <v-btn>submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-title>Remove Service</v-card-title>
          <v-text-field
            v-model="serviceName"
            placeholder="Service Name"
            outlined
            dense
          ></v-text-field>
          <v-card-actions>
            <v-btn>submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Service } from "@/interfaces/service.interface";

export default Vue.extend({
  name: "CommandCenter",
  data: () => ({
    newService: {} as Service,
    serviceName: "",
    commandCenterLoading: false,
    dreamscapeLoading: false,
    billTrackerLoading: false,
  }),
  methods: {
    async deployCommandCenter(): Promise<void> {
      this.commandCenterLoading = true;
      await this.$store.dispatch("deployCommandCenter");
      this.commandCenterLoading = false;
    },
    async deployDreamscape(): Promise<void> {
      this.dreamscapeLoading = true;
      await this.$store.dispatch("deployDreamscape");
      this.dreamscapeLoading = false;
    },
    async deployBillTracker(): Promise<void> {
      this.billTrackerLoading = true;
      await this.$store.dispatch("deployBillTracker");
      this.billTrackerLoading = false;
    },
  },
});
</script>
