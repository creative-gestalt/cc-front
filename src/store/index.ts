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
    async deployProject(
      { commit },
      payload: Record<string, string>
    ): Promise<void | boolean> {
      commit("SET_PROGRESS", "Docker Building");
      await axios
        .post(`${url}/deploy_project`, { projectName: payload.projectName })
        .then((result) => {
          commit(
            "SET_PROGRESS",
            result.data === true ? "Finished" : result.data
          );
        })
        .catch((error) => commit("SET_PROGRESS", error));
    },
    async restartPlexServices(): Promise<boolean> {
      await axios.get(`${url}/restart_plex_services`);
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
