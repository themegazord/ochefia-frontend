<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-edicao-classe">
        <h2>Aqui você poderá editar sua classe de produtos!</h2>
        <form class="form-edicao-classe" @submit.prevent="editar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="classe.classe_produto_nome"
                :error-messages="v$.classe.classe_produto_nome.$errors.map((e) => e.$message)"
                counter="30"
                label="Insira o nome da classe"
                @input="v$.classe.classe_produto_nome.$touch"
                @blur="v$.classe.classe_produto_nome.$touch"
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
import { helpers, maxLength, required } from '@vuelidate/validators'
import { mapActions } from 'pinia'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import { useNotificacoes } from '../../../stores/notificacao'
import { useEndpoints } from '../../../stores/endpoints'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
export default {
  components: {
    NavbarSistemaComponent,
    NotificacaoComponent,
    LoadingComponent
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().getSubMenus,
      loading: false,
      classe: {
        classe_produto_id: '',
        classe_produto_nome: ''
      },
      indisponivel: false
    }
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    async editar() {
      if (await this.v$.classe.$validate()) {
        this.loading = true
        axios
          .put(`${useEndpoints().getEdicaoClasseProduto}${this.$route.params.id}`,{
            classe_produto_nome: this.classe.classe_produto_nome
          }, {
            headers: {
              Accept: 'application/json',
              Authorization: useEndpoints().getToken
            }
          })
          .then((res) => {
            console.log(this.classe)
            this.setNotificacoes(
              `${res.data.mensagem} -> ${res.data.classe_produto.classe_produto_nome}`,
              'Sucesso',
              'sucesso'
            )
            this.loading = false
          })
          .catch((err) => {
            if (err.response.data.errors) {
              const erros = Object.entries(err.response.data.erros)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'classe_produto_nome':
                    this.setNotificacoes(valor[0], 'Campo do nome da classe', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte EdicaoClasseView|EdicaoClasse',
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
  mounted() {
    this.loading = true
    axios
      .get(`${useEndpoints().getConsultaClasseProduto}${this.$route.params.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.classe = { ...res.data.classe_produto }
        this.loading = false
      })
      .catch((err) => {
        if (err.response.data.erro) {
          this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
          this.indisponivel = true
          this.loading = false
        }
      })
  },
  validations() {
    return {
      classe: {
        classe_produto_nome: {
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
.container-edicao-classe {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-edicao-classe {
  padding: 3rem;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>