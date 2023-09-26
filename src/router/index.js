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
import ListagemFabricanteView from "../views/Estoque/Fabricante/ListagemFabricanteView.vue"
import CadastroFabricanteView from "../views/Estoque/Fabricante/CadastroFabricanteView.vue"
import EdicaoFabricanteView from "../views/Estoque/Fabricante/EdicaoFabricanteView.vue"
import ListagemUnidadeView from "../views/Estoque/Unidade/ListagemUnidadeView.vue"
import CadastroUnidadeView from "../views/Estoque/Unidade/CadastroUnidadeView.vue"
import EdicaoUnidadeView from "../views/Estoque/Unidade/EdicaoUnidadeView.vue"
import ListagemProdutoView from "../views/Estoque/Produto/ListagemProdutoView.vue"
import CadastroProdutoView from "../views/Estoque/Produto/CadastroProdutoView.vue"
import EdicaoProdutoView from "../views/Estoque/Produto/EdicaoProdutoView.vue"
import ListagemPrazoPgtoView from "../views/Financeiro/PrazoPgto/ListagemPrazoPgtoView.vue"
import CadastroPrazoPgtoView from "../views/Financeiro/PrazoPgto/CadastroPrazoPgtoView.vue"

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
      meta: { requiresAuth: true, literalName: 'Dashboard' },
      component: DashboardView
    },
    {
      path: '/estoque',
      name: 'estoque',
      meta: { requiresAuth: true, literalName: 'Estoque' },
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
        },
        {
          path: 'fabricante',
          name: 'fabricante',
          children: [
            {
              path: 'listagem',
              name: 'fabricante.listagem',
              component: ListagemFabricanteView
            },
            {
              path: 'cadastro',
              name: 'fabricante.cadastro',
              component: CadastroFabricanteView
            },
            {
              path: 'edicao/:id',
              name: 'fabricante.edicao',
              component: EdicaoFabricanteView
            }
          ]
        },
        {
          path: 'unidade',
          name: 'unidade',
          children: [
            {
              path: 'listagem',
              name: 'unidade.listagem',
              component: ListagemUnidadeView
            },
            {
              path: 'cadastro',
              name: 'unidade.cadastro',
              component: CadastroUnidadeView
            },
            {
              path: 'edicao/:id',
              name: 'unidade.edicao',
              component: EdicaoUnidadeView
            }
          ]
        },
        {
          path: 'produto',
          name: 'produto',
          children: [
            {
              path: 'listagem',
              name: 'produto.listagem',
              component: ListagemProdutoView
            },
            {
              path: 'cadastro',
              name: 'produto.cadastro',
              component: CadastroProdutoView
            },
            {
              path: 'edicao/:id',
              name: 'produto.edicao',
              component: EdicaoProdutoView
            }
          ]
        },
      ]
    },
    {
      path: '/financeiro',
      name: 'financeiro',
      meta: { requiresAuth: true, literalName: 'Financeiro'},
      children: [
        {
          path: 'prazopgto',
          name: 'financeiro.prazopgto',
          children: [
            {
              path: 'listagem',
              name: 'financeiro.prazopgto.listagem',
              component: ListagemPrazoPgtoView
            },
            {
              path: 'cadastro',
              name: 'financeiro.prazopgto.cadastro',
              component: CadastroPrazoPgtoView
            },
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
