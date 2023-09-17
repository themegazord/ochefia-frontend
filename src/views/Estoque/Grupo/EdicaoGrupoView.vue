<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-grupo">
        <h2>Aqui você poderá cadastrar novos grupos de produtos!</h2>
        <form class="form-cadastro-grupo" @submit.prevent="cadastrar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="grupo.grupo_produto_nome"
                :error-messages="v$.grupo.grupo_produto_nome.$errors.map((e) => e.$message)"
                counter="30"
                label="Insira o nome do grupo"
                :disabled="naoExiste"
                @input="v$.grupo.grupo_produto_nome.$touch"
                @blur="v$.grupo.grupo_produto_nome.$touch"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <v-select
                :items="tipos"
                item-title="tipo"
                item-value="tipo_abbr"
                label="Insira o tipo do grupo"
                :disabled="naoExiste"
                v-model="grupo.grupo_produto_tipo"
              ></v-select
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn variant="tonal" class="color: var(--green-confirm) ; float-right" type="submit" :disabled="naoExiste"
                >Salvar</v-btn
              >
            </v-col>
          </v-row>
        </form>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { required, maxLength, helpers } from '@vuelidate/validators'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import useVuelidate from '@vuelidate/core'
import { mapActions } from 'pinia'
import { useNotificacoes } from '../../../stores/notificacao'
import axios from 'axios'
import { useEndpoints } from '../../../stores/endpoints'
export default {
  components: {
    NavbarSistemaComponent,
    NotificacaoComponent,
    LoadingComponent
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().getSubMenus,
      loading: false,
      tipos: [
        {
          tipo: 'Produto Final',
          tipo_abbr: 'PRODUTO_FINAL'
        },
        {
          tipo: 'Matéria Prima',
          tipo_abbr: 'MATERIA_PRIMA'
        },
        {
          tipo: 'Embalagem',
          tipo_abbr: 'EMBALAGEM'
        },
        {
          tipo: 'Serviços',
          tipo_abbr: 'SERVICOS'
        },
        {
          tipo: 'Outros',
          tipo_abbr: 'OUTROS'
        }
      ],
      grupo: {
        grupo_produto_id: '',
        grupo_produto_nome: '',
        grupo_produto_tipo: ''
      },
      naoExiste: false
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(`${useEndpoints().getGrupoPorIdGrupoProduto}${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        this.grupo = {
          grupo_produto_id: res.data.grupo.grupo_produto_id,
          grupo_produto_nome: res.data.grupo.grupo_produto_nome,
          grupo_produto_tipo: this.tipos.find(t => t.tipo === res.data.grupo.grupo_produto_tipo).tipo_abbr
        }
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        this.naoExiste = true
        this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes', 'dispatchNotificacoes']),
    async cadastrar() {
      if (await this.v$.grupo.$validate()) {
        this.loading = true
        axios
          .put(`${useEndpoints().getEdicaoGrupoProduto}${this.grupo.grupo_produto_id}`, {
            grupo_produto_nome: this.grupo.grupo_produto_nome,
            grupo_produto_tipo: this.grupo.grupo_produto_tipo
          }, {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem('token') || sessionStorage.getItem('token')
              }`,
              Accept: 'application/json'
            }
          })
          .then((resposta) => {
            this.setNotificacoes(
              `${resposta.data.mensagem} -> ${resposta.data.grupo.grupo_produto_nome}`,
              'Sucesso',
              'sucesso'
            )
            this.loading = false
          })
          .catch((erro) => {
            console.log(erro)
            if (erro.response.data.errors) {
              const erros = Object.entries(erro.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'grupo_produto_nome':
                    this.setNotificacoes(valor[0], 'Campo do nome do grupo', 'erro')
                    break
                  case 'grupo_produto_tipo':
                    this.setNotificacoes(valor[0], 'Campo do tipo do grupo', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte CadastroGrupoView|CadastroGrupo',
                      'Erro interno',
                      'erro'
                    )
                }
              }
            } else if (erro.response.data.erro) {  
              this.setNotificacoes(erro.response.data.erro, 'Erro', 'erro')
            }
            this.loading = false
          })
      }
    }
  },
  validations() {
    return {
      grupo: {
        grupo_produto_nome: {
          required: helpers.withMessage('O campo do nome do produto é obrigatório', required),
          maxLength: helpers.withMessage('O nome deve conter até 30 caracteres', maxLength(30))
        }
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-grupo {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-grupo {
  padding: 3rem;
}
</style>