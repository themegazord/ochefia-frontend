<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-fabricante">
        <h2>Aqui você poderá editar seus fabricantes de produtos!</h2>
        <form class="form-cadastro-fabricante" @submit.prevent="editar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="fabricante.fabricante_produto_nome"
                :error-messages="
                  v$.fabricante.fabricante_produto_nome.$errors.map((e) => e.$message)
                "
                counter="90"
                label="Insira o nome do fabricante"
                @input="v$.fabricante.fabricante_produto_nome.$touch"
                @blur="v$.fabricante.fabricante_produto_nome.$touch"
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
      fabricante: {
        fabricante_produto_id: '',
        fabricante_produto_nome: ''
      },
      indisponivel: false
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(`${useEndpoints().getConsultaFabricanteProduto}${this.$route.params.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.fabricante = { ...res.data.fabricante_produto }
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
      if (await this.v$.fabricante.$validate()) {
        this.loading = true
        axios
          .put(
            `${useEndpoints().getEdicaoFabricanteProduto}${this.fabricante.fabricante_produto_id}`,
            {
              fabricante_produto_nome: this.fabricante.fabricante_produto_nome
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
              `${res.data.mensagem} => ${this.fabricante.fabricante_produto_nome}`, 'Sucesso', 'sucesso'
            )
            this.loading = false
          })
          .catch((err) => {
            if (err.response.data.errors) {
              const erros = Object.entries(err.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'fabricante_produto_nome':
                    this.setNotificacoes(valor[0], 'Campo de nome do fabricante', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte EdicaoFabricanteView|CadastroFabricante',
                      'Erro interno',
                      'erro'
                    )
                }
              }
            } else if (err.response.data.erro) {
              this.setNotificacoes(err.response.data.erro, 'Erro ao editar fabricante', 'erro')
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
      fabricante: {
        fabricante_produto_nome: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          ),
          maxLength: helpers.withMessage(
            'Esse campo tem que conter no máximo 90 caracteres.',
            maxLength(90)
          )
        }
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-fabricante {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-fabricante {
  padding: 3rem;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>