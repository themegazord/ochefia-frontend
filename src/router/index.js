import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "../views/Home/HomeView.vue"
import CadastroView from "../views/Autenticacao/CadastroView.vue"
import DashboardView from "../views/Dashboard/DashboardView.vue"
import ListagemGrupoView from "../views/Estoque/Grupo/ListagemGrupoView.vue"
import CadastroGrupoView from "../views/Estoque/Grupo/CadastroGrupoView.vue"
import LoginView from "../views/Autenticacao/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: DashboardView
    },
    {
      path: '/estoque',
      name: 'estoque',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'grupo/listagem',
          name: 'estoque.grupo.listagem',
          component: ListagemGrupoView
        },
        {
          path: 'grupo/cadastro',
          name: 'estoque.grupo.cadastro',
          component: CadastroGrupoView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !(localStorage.getItem('token') || sessionStorage.getItem('token'))) {
    next('/login')
  } else {
    next()
  }
})

export default router
