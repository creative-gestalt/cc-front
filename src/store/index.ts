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
    dreamscape_progress: "",
  },
  mutations: {
    SET_DREAM_PROGRESS(state: State, value: string) {
      state.dreamscape_progress = value;
    },
  },
  actions: {
    async deployCommandCenter(): Promise<boolean> {
      await axios.get(`${url}/deploy_commandcenter`);
      return true;
    },
    async deployDreamscape({ commit }): Promise<void | boolean> {
      const commands = [
        { command: "stop-services" },
        { command: "build-front" },
        { command: "build-back" },
        { command: "start-services" },
      ];
      commit("SET_DREAM_PROGRESS", "stopping services");
      await axios
        .post(`${url}/deploy_dreamscape`, commands[0])
        .then(async (response) => {
          commit("SET_DREAM_PROGRESS", response.data);
          commit("SET_DREAM_PROGRESS", "building frontend");
          await axios
            .post(`${url}/deploy_dreamscape`, commands[1])
            .then(async (response) => {
              commit("SET_DREAM_PROGRESS", response.data);
              commit("SET_DREAM_PROGRESS", "building backend");
              await axios
                .post(`${url}/deploy_dreamscape`, commands[2])
                .then(async (response) => {
                  commit("SET_DREAM_PROGRESS", response.data);
                  commit("SET_DREAM_PROGRESS", "starting services");
                  await axios
                    .post(`${url}/deploy_dreamscape`, commands[3])
                    .then((response) => {
                      setTimeout(() => commit("SET_DREAM_PROGRESS", ""), 250);
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
    dreamProgress: (state: State): string => state.dreamscape_progress,
  },
  modules: {},
});
