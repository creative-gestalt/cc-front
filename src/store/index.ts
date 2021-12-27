import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const url = "192.168.1.250:3002";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async deployDreamscape(): Promise<boolean> {
      await axios.get(`${url}/deploy_dreamscape`);
      return true;
    },
  },
  modules: {},
});
