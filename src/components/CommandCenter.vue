<template>
  <v-container>
    <v-row class="text-center">
      <v-col v-if="false" cols="4">
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
      <v-col cols="12" md="4" lg="4">
        <v-card>
          <v-card-title>Deploy DreamScape</v-card-title>
          <v-card-actions>
            <v-btn @click="deployProject('dreamscape')" width="100%">
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-card>
          <v-card-title>Deploy DreamScape2</v-card-title>
          <v-card-actions>
            <v-btn @click="deployProject('dreamscape-l')" width="100%">
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <v-card>
          <v-card-title>Deploy BillTracker</v-card-title>
          <v-card-actions>
            <v-btn
              @click="deployBillTracker"
              :loading="billTrackerLoading"
              width="100%"
            >
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>Restart Plex</v-card-title>
          <v-card-actions>
            <v-btn
              @click="restartPlexServices"
              :loading="plexLoading"
              width="100%"
            >
              restart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>Remount Drive</v-card-title>
          <v-card-actions>
            <v-btn
              @click="remountWDBlackDrive"
              :loading="remountDriveLoading"
              width="100%"
            >
              remount
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
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
            <v-btn :loading="createServiceLoading" @click="createService">
              submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="pa-2">
          <v-card-title>Remove Service</v-card-title>
          <v-text-field
            v-model="serviceName"
            placeholder="Service Name"
            outlined
            dense
          ></v-text-field>
          <v-card-actions>
            <v-btn :loading="removeServiceLoading" @click="removeService">
              submit
            </v-btn>
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
    loading: false,
    billTrackerLoading: false,
    plexLoading: false,
    createServiceLoading: false,
    removeServiceLoading: false,
    remountDriveLoading: false,
  }),
  methods: {
    async deployCommandCenter(): Promise<void> {
      this.commandCenterLoading = true;
      await this.$store.dispatch("deployCommandCenter");
      this.commandCenterLoading = false;
    },
    async deployProject(projectName: string): Promise<void> {
      this.loading = true;
      await this.$store.dispatch("deployProject", { projectName: projectName });
      this.loading = false;
    },
    async deployBillTracker(): Promise<void> {
      this.billTrackerLoading = true;
      await this.$store.dispatch("deployBillTracker");
      this.billTrackerLoading = false;
    },
    async restartPlexServices(): Promise<void> {
      this.plexLoading = true;
      await this.$store.dispatch("restartPlexServices");
      this.plexLoading = false;
    },
    async createService(): Promise<void> {
      this.createServiceLoading = true;
      if (Object.keys(this.newService).length > 0)
        await this.$store.dispatch("createService", this.newService);
      this.createServiceLoading = false;
    },
    async removeService(): Promise<void> {
      this.removeServiceLoading = true;
      if (this.serviceName)
        await this.$store.dispatch("removeService", { name: this.serviceName });
      this.removeServiceLoading = false;
    },
    async remountWDBlackDrive(): Promise<void> {
      this.remountDriveLoading = true;
      await this.$store.dispatch("remountWDBlackDrive");
      this.remountDriveLoading = false;
    },
  },
  computed: {
    progress(): string {
      return this.$store.getters.progress;
    },
  },
});
</script>
