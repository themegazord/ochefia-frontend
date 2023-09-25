<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-produto">
        <h2>Aqui você poderá cadastrar novos produtos de produtos!</h2>
        <form class="form-cadastro-produto" @submit.prevent="cadastrar">
          <v-row>
            <v-col cols="6">
              <v-text-field type="text" v-model="produto.produto_nome" :error-messages="v$.produto.produto_nome.$errors.map((e) => e.$message)
                " counter="90" label="Insira o nome do produto" @input="v$.produto.produto_nome.$touch"
                @blur="v$.produto.produto_nome.$touch"></v-text-field></v-col>
            <v-col cols="6">
              <v-text-field 
                prefix="R$"
                v-model="produto.produto_preco"
                label="Insira o preço do produto"
                :error-messages="v$.produto.produto_preco.$errors.map((e) => e.$message)"
                @input="v$.produto.produto_preco.$touch"
                @blur="v$.produto.produto_preco.$touch"
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="produto.produto_estoque"
                label="Insira o estoque do produto"
                :error-messages="v$.produto.produto_estoque.$errors.map((e) => e.$message)"
                @input="v$.produto.produto_estoque.$touch"
                @blur="v$.produto.produto_estoque.$touch"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="grupos"
                item-title="grupo_produto_nome"
                item_value="grupo_produto_id"
                label="Insira o seu grupo"
                v-model="produto.grupo_produto_id"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="botoes">
              <v-btn variant="tonal" @click="$router.go(-1)" color="var(--vermilion)">Voltar</v-btn>
              <v-btn variant="tonal" type="submit" color="var(--green-confirm)">Salvar</v-btn>
            </v-col>
          </v-row>
        </form>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { mapActions } from 'pinia'
import axios from 'axios'
import { helpers, maxLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import { useNotificacoes } from '../../../stores/notificacao'
import { useEndpoints } from '../../../stores/endpoints'
import { useInfoLoading } from '../../../stores/infoLoading'
export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  components: {
    NavbarSistemaComponent,
    NotificacaoComponent,
    LoadingComponent
  },
  data() {
    return {
      loading: false,
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().getSubMenus,
      produto: {
        empresa_id: JSON.parse(atob(useEndpoints().getEmpresaToken)).empresa_id,
        grupo_produto_id: undefined,
        sub_grupo_produto_id: 0,
        fabricante_produto_id: 0,
        classe_produto_id: 0,
        unidade_id: 0,
        produto_nome: '',
        produto_estoque: 0.00,
        produto_preco: 0.00,
      },
      grupos: [],
      subgrupos: [],
      fabricantes: [],
      classes: [],
      unidades: [],
    }
  },
  mounted() {
    axios
      .get(useEndpoints().getListagemGrupoProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.loading = true
        this.grupos = res.data.grupos
        this.setInfo('Coletando os dados dos grupos...')
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(useEndpoints().getListagemSubGrupoProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.subgrupos = res.data.subgrupos
        this.setInfo('Coletando os dados dos subgrupos...')
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(useEndpoints().getListagemFabricanteProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.fabricantes = res.data.fabricantes
        this.setInfo('Coletando os dados dos fabricantes...')
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(useEndpoints().getListagemClasseProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.classes = res.data.classes
        this.setInfo('Coletando os dados dos classes...')
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(useEndpoints().getListagemUnidadeProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.unidades = res.data.unidades
        this.setInfo('Coletando os dados dos unidades...')
        this.loading = false
        this.dispatchInfo
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    ...mapActions(useInfoLoading, ['setInfo', 'dispatchInfo']),
    async cadastrar() {
      if (await this.v$.produto.$validate()) {
        this.loading = true
        axios
          .post(useEndpoints().getCadastroprodutoProduto, this.produto, {
            headers: {
              Accept: 'application/json',
              Authorization: useEndpoints().getToken
            }
          })
          .then((res) => {
            console.log(res)
            this.setNotificacoes(
              `${res.data.mensagem} -> ${res.data.produto.produto_nome}`,
              'Sucesso',
              'sucesso'
            )
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            if (err.response.data.errors) {
              const erros = Object.entries(err.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'produto_nome':
                    this.setNotificacoes(valor[0], 'Campo de nome do produto', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte CadastroprodutoView|Cadastroproduto',
                      'Erro interno',
                      'erro'
                    )
                }
              }
            } else if (err.response.data.erro) {
              this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
            }
            this.loading = false
          })
      }
    }
  },
  validations() {
    return {
      produto: {
        produto_nome: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          ),
          maxLength: helpers.withMessage(
            'Esse campo tem que conter no máximo 155 caracteres.',
            maxLength(155)
          )
        },
        produto_preco: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          )
        },
        produto_estoque: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          )
        },
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-produto {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-produto {
  padding: 3rem;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>