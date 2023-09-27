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
        edicao: `${servidor}/api/v1/unidade/unidade/`,
        remocao: `${servidor}/api/v1/unidade/unidade/`,
      },
      produto: {
        listagem: `${servidor}/api/v1/produto/listagem/`,
        cadastro: `${servidor}/api/v1/produto/cadastro`,
        consulta: `${servidor}/api/v1/produto/consulta/`,
        edicao: `${servidor}/api/v1/produto/edicao/`,
        remocao: `${servidor}/api/v1/produto/remocao/`,
      }
    },
    financeiro: {
      prazopgto: {
        listagem: `${servidor}/api/v1/prazopgto/listagem/`,
        cadastro: `${servidor}/api/v1/prazopgto/cadastro`,
        consulta: `${servidor}/api/v1/prazopgto/consulta/`,
        edicao: `${servidor}/api/v1/prazopgto/edicao/`,
      },
      prazopgto_dias: {
        cadastro: `${servidor}/api/v1/prazopgtodias/cadastro`,
        consulta: `${servidor}/api/v1/prazopgtodias/consulta/`,
        edicao: `${servidor}/api/v1/prazopgtodias/edicao/`,
      }
    },
    token: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
    empresaToken: localStorage.getItem('empresa_token') || sessionStorage.getItem('empresa_token')
  }),
  getters: {
    getToken: (state) => state.token,
    getEmpresaToken: (state) => state.empresaToken,
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
    getEdicaoUnidadeProduto: (state) => state.estoque.unidade.edicao,
    getRemocaoUnidadeProduto: (state) => state.estoque.unidade.remocao,
    getListagemProduto: (state) => state.estoque.produto.listagem,
    getCadastroProduto: (state) => state.estoque.produto.cadastro,
    getConsultaProduto: (state) => state.estoque.produto.consulta,
    getEdicaoProduto: (state) => state.estoque.produto.edicao,
    getRemocaoProduto: (state) => state.estoque.produto.remocao,
    getListagemPrazoPgto: (state) => state.financeiro.prazopgto.listagem,
    getCadastroPrazoPgto: (state) => state.financeiro.prazopgto.cadastro,
    getConsultaPrazoPgto: (state) => state.financeiro.prazopgto.consulta,
    getEdicaoPrazoPgto: (state) => state.financeiro.prazopgto.edicao,
    getCadastroPrazoPgtoDias: (state) => state.financeiro.prazopgto_dias.cadastro,
    getConsultaPrazoPgtoDias: (state) => state.financeiro.prazopgto_dias.consulta,
    getEdicaoPrazoPgtoDias: (state) => state.financeiro.prazopgto_dias.edicao,
  }
})