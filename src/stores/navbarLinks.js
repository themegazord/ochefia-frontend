import { defineStore } from 'pinia'

export const useNavbarLinksStore = defineStore('links', {
  state: () => ({
    links: [
      {
          url: '/quem-somos',
          name: 'Quem somos'
      },
      {
          url: '/contatos',
          name: 'Contatos'
      },
      {
          url: '/cadastro',
          name: 'Crie sua conta'
      },
      {
        url: '/login',
        name: 'Login'
      }
    ]
  }),
  getters: {
    getLinks: (state) => state.links
  }
})