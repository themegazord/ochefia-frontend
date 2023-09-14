import { defineStore } from "pinia";

export const useNotificacoes = defineStore('notificacao', {
  state: () => ({
    notificacoes: []
  }),
  getters: {
    getNotificacoes: (state) => state.notificacoes
  },
  actions: {
    setNotificacoes (data, titulo = 'Erro', tipo) {
        this.notificacoes.push({titulo: titulo, notificacao: data, tipo})
    },
    dispatchNotificacoes () {
      this.notificacoes.splice(0, this.notificacoes.length)
    }
  }
})