<template>
  <NavbarComponent :links="links" />
  <main>
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <div class="container-login">
      <form @submit.prevent="logar" class="form-login">
        <h1 class="text-center titulo">Entre no sistema</h1>
        <v-row>
          <v-col cols="12">
            <v-text-field
              type="email"
              v-model="login.email"
              :error-messages="v$.login.email.$errors.map((e) => e.$message)"
              counter="255"
              label="Insira seu email"
              @input="v$.login.email.$touch"
              @blur="v$.login.email.$touch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              type="password"
              v-model="login.senha"
              :error-messages="v$.login.senha.$errors.map((e) => e.$message)"
              counter="255"
              label="Insira sua senha"
              @input="v$.login.senha.$touch"
              @blur="v$.login.senha.$touch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <label for="manter-logado">
              <input
                type="checkbox"
                name="manter-logado"
                id="manter-logado"
                v-model="login.manterLogado"
              />
              <span> Manter conectado?</span>
            </label>
          </v-col>
          <v-col cols="6">
            <v-btn block size="large" type="submit">Cadastro</v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </main>
</template>

<script>
import { helpers, required, maxLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions } from 'pinia'
import NavbarComponent from '../../components/Navbar/NavbarComponent.vue'
import NotificacaoComponent from '../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../components/Geral/LoadingComponent.vue'
import { useNavbarLinksStore } from '../../stores/navbarLinks'
import { useNotificacoes } from '../../stores/notificacao'
import axios from 'axios'
import { useEndpoints } from '../../stores/endpoints'
export default {
  components: {
    NavbarComponent,
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
      links: useNavbarLinksStore().getLinks,
      loading: false,
      login: {
        email: '',
        senha: '',
        manterLogado: false
      }
    }
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes', 'dispatchNotificacoes']),
    async logar() {
      if (await this.v$.login.$validate()) {
        this.loading = true
        axios
          .post(
            useEndpoints().getAutenticacaoLogin,
            {
              email: this.login.email,
              password: this.login.senha
            },
            {
              headers: {
                Accept: 'application/json'
              }
            }
          )
          .then((resposta) => {
            if (this.login.manterLogado) {
              localStorage.setItem('token', resposta.data.mensagem.token)
              localStorage.setItem('usuario', JSON.stringify(resposta.data.mensagem.user))
              this.loading = false
              this.$router.push({ path: '/dashboard' })
            } else if (!this.login.manterLogado) {
              sessionStorage.setItem('token', resposta.data.mensagem.token)
              sessionStorage.setItem('usuario', JSON.stringify(resposta.data.mensagem.user))
              this.loading = false
              this.$router.push({ path: '/dashboard' })
            }
          })
          .catch((erro) => {
            if (erro.response.data.errors) {
              const erros = Object.entries(erro.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'email':
                    this.setNotificacoes(valor[0], 'Campo de email', 'erro')
                    break
                  case 'password':
                    this.setNotificacoes(valor[0], 'Campo da senha', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte LoginView|Login',
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
      login: {
        email: {
          required: helpers.withMessage('O campo de email é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres.', maxLength(255)),
          email: helpers.withMessage('O email é inválido.', email)
        },
        senha: {
          required: helpers.withMessage('O campo de senha é obrigatório.', required),
          maxLength: helpers.withMessage('A senha deve conter até 255 caracteres.', maxLength(255))
        }
      }
    }
  }
}
</script>

<style scoped>
main {
  height: 80vh;
}

.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form-login {
  width: 30%;
  background-color: var(--platinum);
  padding: 2rem;
  border-radius: 10px;
}

.titulo {
  font-family: 'Poppins', sans-serif;
  padding-bottom: 1.5rem;
}
</style>