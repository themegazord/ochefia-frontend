<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-subgrupo">
        <h2>Aqui você poderá editar seus sub grupos de produtos!</h2>
        <form class="form-cadastro-subgrupo" @submit.prevent="editar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="subgrupo.sub_grupo_produto_nome"
                :error-messages="v$.subgrupo.sub_grupo_produto_nome.$errors.map((e) => e.$message)"
                counter="30"
                label="Insira o nome do subgrupo"
                @input="v$.subgrupo.sub_grupo_produto_nome.$touch"
                @blur="v$.subgrupo.sub_grupo_produto_nome.$touch"
                :disabled="naoExiste"
              ></v-text-field
            ></v-col>
            <v-col cols="6"></v-col>
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
import { mapActions } from 'pinia'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import { useNotificacoes } from '../../../stores/notificacao'
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, required } from '@vuelidate/validators'
import axios from 'axios'
import { useEndpoints } from '../../../stores/endpoints'
export default {
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
      subgrupo: {
        sub_grupo_produto_id: '',
        sub_grupo_produto_nome: ''
      },
      naoExiste: false
    }
  },
  mounted() {
    this.loading = true
    axios.
      get(`${useEndpoints().getConsultaSubGrupoProduto}${this.$route.params.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.loading = false
        this.subgrupo = { ...res.data.sub_grupo }
      })
      .catch((err) => {
        if (err.response.data.erro) {
          this.naoExiste = true
          this.loading = false
          this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    async editar() {
      if (await this.v$.subgrupo.$validate()) {
        this.loading = true
        axios
          .put(`${useEndpoints().getEdicaoSubGrupoProduto}${this.$route.params.id}`, {
            sub_grupo_produto_nome: this.subgrupo.sub_grupo_produto_nome
          }, {
            headers: {
              Accept: 'application/json',
              Authorization: useEndpoints().getToken
            }
          })
          .then((res) => {
            this.setNotificacoes(
              `${res.data.mensagem} -> ${this.subgrupo.sub_grupo_produto_nome}`,
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
                  case 'sub_grupo_produto_nome':
                    this.setNotificacoes(valor[0], 'Campo de nome do subgrupo', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte CadastroSubGrupoView|CadastroSubGrupo',
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
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      subgrupo: {
        sub_grupo_produto_nome: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          ),
          maxLength: helpers.withMessage(
            'Esse campo tem que conter no máximo 30 caracteres.',
            maxLength(30)
          )
        }
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-subgrupo {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-subgrupo {
  padding: 3rem;
}
</style>