import { defineStore } from "pinia";

export const useInfoLoading = defineStore('infoLoading', {
  state: () => ({
    info: ''
  }),
  getters: {
    getInfo: (state) => state.info
  },
  actions: {
    setInfo (info) {
      this.info = info
    },
    dispatchInfo () {
      this.info = ""
    }
  }
})