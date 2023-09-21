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
      },
      subgrupo: {
        listagem: `${servidor}/api/v1/sub_grupo_produto/listagem`,
        cadastro: `${servidor}/api/v1/sub_grupo_produto/cadastro`,
        consulta: `${servidor}/api/v1/sub_grupo_produto/sub_grupo/`,
        edicao: `${servidor}/api/v1/sub_grupo_produto/sub_grupo/`,
        remocao: `${servidor}/api/v1/sub_grupo_produto/sub_grupo/`,
      },
      classes: {
        listagem: `${servidor}/api/v1/classe_produto/listagem`,
        cadastro: `${servidor}/api/v1/classe_produto/cadastro`,
        consulta: `${servidor}/api/v1/classe_produto/classe/`,
        edicao: `${servidor}/api/v1/classe_produto/classe/`,
        remocao: `${servidor}/api/v1/classe_produto/classe/`,
      },
      fabricante: {
        listagem: `${servidor}/api/v1/fabricante_produto/listagem`,
        cadastro: `${servidor}/api/v1/fabricante_produto/cadastro`,
        consulta: `${servidor}/api/v1/fabricante_produto/fabricante/`,
        edicao: `${servidor}/api/v1/fabricante_produto/fabricante/`,
        remocao: `${servidor}/api/v1/fabricante_produto/fabricante/`,
      },
      unidade: {
        listagem: `${servidor}/api/v1/unidade/listagem`,
        cadastro: `${servidor}/api/v1/unidade/cadastro`,
        consulta: `${servidor}/api/v1/unidade/unidade/`,
      }
    },
    token: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
  }),
  getters: {
    getToken: (state) => state.token,
    getAutenticacaoLogin: (state) => state.autenticacao.login,
    getCadastroCliente: (state) => state.cliente.cadastro,
    getCadastroEmpresa: (state) => state.empresa.cadastro,
    getCadastroFuncionarioDono: (state) => state.empresa.funcionario.dono.cadastro,
    getCadastroGrupoProduto: (state) => state.estoque.grupo.cadastro,
    getListagemGrupoProduto: (state) => state.estoque.grupo.listagem,
    getGrupoPorIdGrupoProduto: (state) => state.estoque.grupo.grupoPorId,
    getEdicaoGrupoProduto: (state) => state.estoque.grupo.edicao,
    getRemocaoGrupoProduto: (state) => state.estoque.grupo.remocao,
    getListagemSubGrupoProduto: (state) => state.estoque.subgrupo.listagem,
    getCadastroSubGrupoProduto: (state) => state.estoque.subgrupo.cadastro,
    getConsultaSubGrupoProduto: (state) => state.estoque.subgrupo.consulta,
    getEdicaoSubGrupoProduto: (state) => state.estoque.subgrupo.edicao,
    getRemocaoSubGrupoProduto: (state) => state.estoque.subgrupo.remocao,
    getListagemClasseProduto: (state) => state.estoque.classes.listagem,
    getCadastroClasseProduto: (state) => state.estoque.classes.cadastro,
    getConsultaClasseProduto: (state) => state.estoque.classes.consulta,
    getEdicaoClasseProduto: (state) => state.estoque.classes.edicao,
    getRemocaoClasseProduto: (state) => state.estoque.classes.remocao,
    getListagemFabricanteProduto: (state) => state.estoque.fabricante.listagem,
    getCadastroFabricanteProduto: (state) => state.estoque.fabricante.cadastro,
    getConsultaFabricanteProduto: (state) => state.estoque.fabricante.consulta,
    getEdicaoFabricanteProduto: (state) => state.estoque.fabricante.edicao,
    getRemocaoFabricanteProduto: (state) => state.estoque.fabricante.remocao,
    getListagemUnidadeProduto: (state) => state.estoque.unidade.listagem,
    getCadastroUnidadeProduto: (state) => state.estoque.unidade.cadastro,
    getConsultaUnidadeProduto: (state) => state.estoque.unidade.consulta,
  }
})