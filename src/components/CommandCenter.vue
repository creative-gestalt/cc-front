<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>Deploy DreamScape</v-card-title>
          <v-card-actions>
            <v-btn @click="deployProject('dreamscape')" width="100%">
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>Deploy Pawthenticator</v-card-title>
          <v-card-actions>
            <v-btn @click="deployProject('pawthenticator')" width="100%">
              deploy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-card>
          <v-card-title>Deploy BillTracker</v-card-title>
          <v-card-actions>
            <v-btn @click="deployProject('bill_tracker')" width="100%">
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
            placeholder="Working Directory '/home/nick/'"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newService.package"
            placeholder="Package Name 'npm (backend)' or 'serve (frontend)'"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="newService.frontPort"
            placeholder="Frontend Port (only)"
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
    loading: false,
    plexLoading: false,
    createServiceLoading: false,
    removeServiceLoading: false,
  }),
  methods: {
    async deployProject(projectName: string): Promise<void> {
      this.loading = true;
      await this.$store.dispatch("deployProject", { projectName: projectName });
      this.loading = false;
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
      this.newService = {
        name: "",
        workdir: "",
        package: "",
        frontPort: "",
      };
    },
    async removeService(): Promise<void> {
      this.removeServiceLoading = true;
      if (this.serviceName)
        await this.$store.dispatch("removeService", { name: this.serviceName });
      this.removeServiceLoading = false;
      this.serviceName = "";
    },
  },
  computed: {
    progress(): string {
      return this.$store.getters.progress;
    },
  },
});
</script>
