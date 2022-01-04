import Vue from "vue";
import Vuex, { Store } from "vuex";
import axios from "axios";
import { Service } from "@/interfaces/service.interface";
import { State } from "@/interfaces/store.interface";

Vue.use(Vuex);

const url = "http://192.168.1.250:3002";
// const url = "http://localhost:3002";

export default new Vuex.Store({
  state: {
    progress: "",
  },
  mutations: {
    SET_PROGRESS(state: State, value: string) {
      state.progress = value;
    },
  },
  actions: {
    async deployCommandCenter(): Promise<boolean> {
      await axios.get(`${url}/deploy_commandcenter`);
      return true;
    },
    async deployProject(
      { commit },
      payload: Record<string, string>
    ): Promise<void | boolean> {
      const commands = [
        { command: "stop-services", projectName: payload.projectName },
        { command: "build-front", projectName: payload.projectName },
        { command: "build-back", projectName: payload.projectName },
        { command: "start-services", projectName: payload.projectName },
      ];
      commit("SET_PROGRESS", "stopping services");
      await axios
        .post(`${url}/deploy_project`, commands[0])
        .then(async (response) => {
          commit("SET_PROGRESS", response.data);
          commit("SET_PROGRESS", "building frontend");
          await axios
            .post(`${url}/deploy_project`, commands[1])
            .then(async (response) => {
              commit("SET_PROGRESS", response.data);
              commit("SET_PROGRESS", "building backend");
              await axios
                .post(`${url}/deploy_project`, commands[2])
                .then(async (response) => {
                  commit("SET_PROGRESS", response.data);
                  commit("SET_PROGRESS", "starting services");
                  await axios
                    .post(`${url}/deploy_project`, commands[3])
                    .then((response) => {
                      setTimeout(() => commit("SET_PROGRESS", ""), 250);
                    });
                });
            });
        });
    },
    async deployBillTracker(): Promise<boolean> {
      await axios.get(`${url}/deploy_billtracker`);
      return true;
    },
    async restartPlexServices(): Promise<boolean> {
      await axios.get(`${url}/restart_plex_services`);
      return true;
    },
    async remountWDBlackDrive(): Promise<boolean> {
      await axios.get(`${url}/remount_wd_drive`);
      return true;
    },
    async createService({ commit }, service: Service): Promise<boolean> {
      await axios.post(`${url}/create_service`, service);
      return true;
    },
    async removeService({ commit }, serviceName: string): Promise<boolean> {
      await axios.post(`${url}/remove_service`, serviceName);
      return true;
    },
  },
  getters: {
    progress: (state: State): string => state.progress,
  },
  modules: {},
});
