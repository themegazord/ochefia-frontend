import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "../views/Home/HomeView.vue"
import CadastroView from "../views/Autenticacao/CadastroView.vue"
import LoginView from "../views/Autenticacao/LoginView.vue"
import DashboardView from "../views/Dashboard/DashboardView.vue"
import ListagemGrupoView from "../views/Estoque/Grupo/ListagemGrupoView.vue"
import CadastroGrupoView from "../views/Estoque/Grupo/CadastroGrupoView.vue"
import EdicaoGrupoView from "../views/Estoque/Grupo/EdicaoGrupoView.vue"
import ListagemSubGrupoView from "../views/Estoque/SubGrupo/ListagemSubGrupoView.vue"
import CadastroSubGrupoView from "../views/Estoque/SubGrupo/CadastroSubGrupoView.vue"
import EdicaoSubGrupoView from "../views/Estoque/SubGrupo/EdicaoSubGrupoView.vue"
import ListagemClasseView from "../views/Estoque/Classe/ListagemClasseView.vue"
import CadastroClasseView from "../views/Estoque/Classe/CadastroClasseView.vue"
import EdicaoClasseView from "../views/Estoque/Classe/EdicaoClasseView.vue"


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
        },
        {
          path: 'grupo/edicao/:id',
          name: 'estoque.grupo.edicao',
          component: EdicaoGrupoView
        },
        {
          path: 'subgrupo',
          name: 'subgrupo',
          children: [
            {
              path: 'listagem',
              name: 'subgrupo.listagem',
              component: ListagemSubGrupoView
            },
            {
              path: 'cadastro',
              name: 'subgrupo.cadastro',
              component: CadastroSubGrupoView
            },
            {
              path: 'edicao/:id',
              name: 'estoque.subgrupo.edicao',
              component: EdicaoSubGrupoView
            }
          ]
        },
        {
          path: 'classe',
          name: 'classe',
          children: [
            {
              path: 'listagem',
              name: 'classe.listagem',
              component: ListagemClasseView
            },
            {
              path: 'cadastro',
              name: 'classe.cadastro',
              component: CadastroClasseView
            },
            {
              path: 'edicao/:id',
              name: 'estoque.classe.edicao',
              component: EdicaoClasseView
            }
          ]
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
