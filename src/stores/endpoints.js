import { defineStore } from "pinia"

const servidor = 'http://127.0.0.1:8000'

export const useEndpoints = defineStore('endpoints', {
  state: () => ({
    autenticacao: {
      login: `${servidor}/api/v1/autenticacao/login`
    },
    empresa: {
      cadastro: `${servidor}/api/v1/empresa/cadastro`,
      funcionario: {
        dono: {
          cadastro: `${servidor}/api/v1/funcionario/cadastro/dono`
        }
      }
    },
    cliente: {
      cadastro: `${servidor}/api/v1/cliente/cadastro`
    },
    estoque: {
      grupo: {
        cadastro: `${servidor}/api/v1/grupo_produto/cadastro`,
        listagem: `${servidor}/api/v1/grupo_produto/listagem`,
        grupoPorId: `${servidor}/api/v1/grupo_produto/grupo/`,
        edicao: `${servidor}/api/v1/grupo_produto/grupo/`,
        remocao: `${servidor}/api/v1/grupo_produto/grupo/`
      }
    }
  }),
  getters: {
    getAutenticacaoLogin: (state) => state.autenticacao.login,
    getCadastroCliente: (state) => state.cliente.cadastro,
    getCadastroEmpresa: (state) => state.empresa.cadastro,
    getCadastroFuncionarioDono: (state) => state.empresa.funcionario.dono.cadastro,
    getCadastroGrupoProduto: (state) => state.estoque.grupo.cadastro,
    getListagemGrupoProduto: (state) => state.estoque.grupo.listagem,
    getGrupoPorIdGrupoProduto: (state) => state.estoque.grupo.grupoPorId,
    getEdicaoGrupoProduto: (state) => state.estoque.grupo.edicao,
    getRemocaoGrupoProduto: (state) => state.estoque.grupo.remocao
  }
})