<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-unidade">
        <h2>Aqui você poderá editar suas unidades de medida de produtos!</h2>
        <form class="form-cadastro-unidade" @submit.prevent="editar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="unidade.unidade_nome"
                :error-messages="
                  v$.unidade.unidade_nome.$errors.map((e) => e.$message)
                "
                counter="50"
                label="Insira o nome da unidade de medida"
                @input="v$.unidade.unidade_nome.$touch"
                @blur="v$.unidade.unidade_nome.$touch"
                :disabled="indisponivel"
              ></v-text-field
            ></v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="botoes">
              <v-btn
                variant="tonal"
                @click="$router.go(-1)"
                :disabled="indisponivel"
                color="var(--vermilion)"
                >Voltar</v-btn
              >
              <v-btn
                variant="tonal"
                type="submit"
                color="var(--green-confirm)"
                :disabled="indisponivel"
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
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, required } from '@vuelidate/validators'
import axios from 'axios'
import { useEndpoints } from '../../../stores/endpoints'
import { mapActions } from 'pinia'
import { useNotificacoes } from '../../../stores/notificacao'
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
      unidade: {
        unidade_id: '',
        unidade_nome: ''
      },
      indisponivel: false
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(`${useEndpoints().getConsultaUnidadeProduto}${this.$route.params.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.unidade = { ...res.data.unidade }
        this.loading = false
      })
      .catch((err) => {
        if (err.response.data.erro) {
          this.indisponivel = true
          this.loading = false
          this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    async editar() {
      if (await this.v$.unidade.$validate()) {
        this.loading = true
        axios
          .put(
            `${useEndpoints().getEdicaounidadeProduto}${this.unidade.unidade_id}`,
            {
              unidade_nome: this.unidade.unidade_nome
            },
            {
              headers: {
                Accept: 'application/json',
                Authorization: useEndpoints().getToken
              }
            }
          )
          .then((res) => {
            this.setNotificacoes(
              `${res.data.mensagem} => ${this.unidade.unidade_nome}`, 'Sucesso', 'sucesso'
            )
            this.loading = false
          })
          .catch((err) => {
            if (err.response.data.errors) {
              const erros = Object.entries(err.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'unidade_nome':
                    this.setNotificacoes(valor[0], 'Campo de nome do unidade', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte EdicaounidadeView|Cadastrounidade',
                      'Erro interno',
                      'erro'
                    )
                }
              }
            } else if (err.response.data.erro) {
              this.setNotificacoes(err.response.data.erro, 'Erro ao editar unidade', 'erro')
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
      unidade: {
        unidade_nome: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          ),
          maxLength: helpers.withMessage(
            'Esse campo tem que conter no máximo 50 caracteres.',
            maxLength(50)
          )
        }
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-unidade {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-unidade {
  padding: 3rem;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>