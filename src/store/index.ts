import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Service } from "@/interfaces/service.interface";

Vue.use(Vuex);

const url = "http://192.168.1.250:3002";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async deployCommandCenter(): Promise<boolean> {
      await axios.get(`${url}/deploy_commandcenter`);
      return true;
    },
    async deployDreamscape(): Promise<boolean> {
      await axios.get(`${url}/deploy_dreamscape`);
      return true;
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
  modules: {},
});
