import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "../views/Home/HomeView.vue"
import CadastroView from "../views/Cadastro/CadastroView.vue"
import DashboardView from "../views/Dashboard/DashboardView.vue"
// import ListagemGrupoView from "../views/Estoque/Grupo/ListagemGrupoView.vue"
import CadastroGrupoView from "../views/Estoque/Grupo/CadastroGrupoView.vue"
// import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/estoque/grupo/listagem',
      name: 'estoque.grupo.listagem',
      component: () => import("../views/Estoque/Grupo/ListagemGrupoView.vue")
    },
    {
      path: '/estoque/grupo/cadastro',
      name: 'estoque.grupo.cadastro',
      component: CadastroGrupoView
    }
  ]
})

export default router
