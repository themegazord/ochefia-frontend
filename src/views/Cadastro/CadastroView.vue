<template>
  <NavbarComponent :links="links" />
  <main>
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <div class="container-cadastro">
      <form @submit.prevent="cadastro" class="form-cadastro">
        <p class="text-center">Escolha sua modalidade:</p>
        <v-container class="escolha-modalidade">
          <label for="sou-cliente" class="escolha-label">
            <input
              type="radio"
              name="sou-cliente"
              id="sou-cliente"
              value="cliente"
              tabindex="1"
              v-model="escolhamodalidade"
            />
            <span> Sou cliente</span>
          </label>
          <label for="sou-dono" class="escolha-label">
            <input
              type="radio"
              name="sou-dono"
              id="sou-dono"
              value="dono"
              tabindex="2"
              v-model="escolhamodalidade"
            />
            <span> Sou dono</span>
          </label>
        </v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="escolhamodalidade == 'cliente'"
              v-model="cliente.nome"
              :error-messages="v$.cliente.nome.$errors.map((e) => e.$message)"
              counter="255"
              label="Insira seu nome"
              @input="v$.cliente.nome.$touch"
              @blur="v$.cliente.nome.$touch"
            ></v-text-field>
            <v-text-field
              v-if="escolhamodalidade == 'dono'"
              v-model="dono.nome"
              :error-messages="v$.dono.nome.$errors.map((e) => e.$message)"
              counter="255"
              label="Insira seu nome"
              @input="v$.dono.nome.$touch"
              @blur="v$.dono.nome.$touch"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :disabled="escolhamodalidade == 'cliente'"
              v-model="empresa.nome"
              :error-messages="v$.empresa.nome.$errors.map((e) => e.$message)"
              label="Insira o nome da sua empresa"
              @input="v$.empresa.nome.$touch"
              @blur="v$.empresa.nome.$touch"
              counter="255"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="escolhamodalidade == 'cliente'"
              v-model="cliente.email"
              type="email"
              :error-messages="v$.cliente.email.$errors.map((e) => e.$message)"
              label="Insira seu email"
              @input="v$.cliente.email.$touch"
              @blur="v$.cliente.email.$touch"
            ></v-text-field>
            <v-text-field
              v-if="escolhamodalidade == 'dono'"
              v-model="dono.email"
              type="email"
              :error-messages="v$.dono.email.$errors.map((e) => e.$message)"
              label="Insira seu email"
              @input="v$.dono.email.$touch"
              @blur="v$.dono.email.$touch"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :disabled="escolhamodalidade == 'cliente'"
              v-model="empresa.cnpj"
              :error-messages="v$.empresa.cnpj.$errors.map((e) => e.$message)"
              label="Insira o CNPJ da sua empresa"
              @input="v$.empresa.cnpj.$touch"
              @blur="v$.empresa.cnpj.$touch"
              counter="14"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :disabled="escolhamodalidade == 'dono'"
              v-model="cliente.cpf"
              :error-messages="v$.cliente.cpf.$errors.map((e) => e.$message)"
              label="Insira seu CPF"
              @input="v$.cliente.cpf.$touch"
              @blur="v$.cliente.cpf.$touch"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="descricao"
              label="Como você define seu estabelecimento?"
              :disabled="escolhamodalidade == 'cliente'"
              v-model="empresa.descricao"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-if="escolhamodalidade == 'cliente'"
              type="password"
              label="Insira sua senha"
              v-model="cliente.senha"
              :error-messages="v$.cliente.senha.$errors.map((e) => e.$message)"
              @input="v$.cliente.senha.$touch"
              @blur="v$.cliente.senha.$touch"
            ></v-text-field>
            <v-text-field
              v-if="escolhamodalidade == 'cliente'"
              type="password"
              label="Confirme sua senha"
              v-model="cliente.senhaVerificacao"
              :error-messages="v$.cliente.senhaVerificacao.$errors.map((e) => e.$message)"
              @input="v$.cliente.senhaVerificacao.$touch"
              @blur="v$.cliente.senhaVerificacao.$touch"
            ></v-text-field>
            <v-text-field
              v-if="escolhamodalidade == 'dono'"
              type="password"
              label="Insira sua senha"
              v-model="dono.senha"
              :error-messages="v$.dono.senha.$errors.map((e) => e.$message)"
              @input="v$.dono.senha.$touch"
              @blur="v$.dono.senha.$touch"
            ></v-text-field>
            <v-text-field
              v-if="escolhamodalidade == 'dono'"
              type="password"
              label="Confirme sua senha"
              v-model="dono.senhaVerificacao"
              :error-messages="v$.dono.senhaVerificacao.$errors.map((e) => e.$message)"
              @input="v$.dono.senhaVerificacao.$touch"
              @blur="v$.dono.senhaVerificacao.$touch"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-file-input
              accept="image/png, image/jpg, image/jpeg"
              prepend-icon="mdi-paperclip"
              label="Caso tenha, insira o logo da sua empresa"
              :disabled="escolhamodalidade == 'cliente'"
              v-model="empresa.logo"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              :disabled="escolhamodalidade == 'dono'"
              label="Insira seu telefone pessoal"
              v-model="cliente.telefonePessoal"
              :error-messages="v$.cliente.telefonePessoal.$errors.map((e) => e.$message)"
              @input="v$.cliente.telefonePessoal.$touch"
              @blur="v$.cliente.telefonePessoal.$touch"
              counter="20"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :disabled="escolhamodalidade == 'dono'"
              label="Insira seu telefone de contato"
              v-model="cliente.telefoneContato"
              :error-messages="v$.cliente.telefoneContato.$errors.map((e) => e.$message)"
              @input="v$.cliente.telefoneContato.$touch"
              @blur="v$.cliente.telefoneContato.$touch"
              counter="20"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn block size="x-large" type="submit">Cadastro</v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </main>
</template>

<script>
import { helpers, required, maxLength, email, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions } from 'pinia'
import axios from 'axios'
import NavbarComponent from '../../components/Navbar/NavbarComponent.vue'
import NotificacaoComponent from '../../components/Geral/NotificacaoComponent.vue'
import LoadingComponent from '../../components/Geral/LoadingComponent.vue'
import { useNavbarLinksStore } from '../../stores/navbarLinks'
import { useNotificacoes } from '../../stores/notificacao'
import { useEndpoints } from '../../stores/endpoints'
import { validaCNPJ } from '../../utils/validaCNPJ'
import { validaCPF } from '../../utils/validaCPF'

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
      escolhamodalidade: 'cliente',
      descricao: ['Bar', 'Mercearia', 'Restaurante', 'Mercado', 'Outros'],
      loading: false,
      cliente: {
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        senhaVerificacao: '',
        telefonePessoal: '',
        telefoneContato: ''
      },
      dono: {
        nome: '',
        email: '',
        senha: '',
        senhaVerificacao: ''
      },
      empresa: {
        nome: '',
        cnpj: '',
        descricao: '',
        logo: null
      }
    }
  },
  methods: {
    async cadastro() {
      if (this.escolhamodalidade == 'cliente') {
        this.loading = true
        if (await this.v$.cliente.$validate()) {
          axios
            .post(
              useEndpoints().getCadastroCliente,
              {
                cliente_nome: this.cliente.nome,
                cliente_email: this.cliente.email,
                cliente_senha: this.cliente.senha,
                cliente_cpf: this.cliente.cpf,
                cliente_telefone: this.cliente.telefonePessoal,
                cliente_telefone_contato: this.cliente.telefoneContato
              },
              {
                headers: {
                  Accept: 'application/json'
                }
              }
            )
            .then((resposta) => {
              sessionStorage.setItem('token', resposta.data.dados.login.token)
              sessionStorage.setItem('usuario', JSON.stringify(resposta.data.dados.login.user))
              this.loading = false
              this.$router.push({ name: 'dashboard' })
            })
            .catch((erro) => {
              if (erro.response.data.errors) {
                const erros = Object.entries(erro.response.data.errors)
                for (const [chave, valor] of erros) {
                  switch (chave) {
                    case 'cliente_cpf':
                      this.setNotificacoes(valor[0], 'Campo do CPF')
                      break
                    case 'cliente_email':
                      this.setNotificacoes(valor[0], 'Campo do email')
                      break
                    case 'cliente_nome':
                      this.setNotificacoes(valor[0], 'Campo do nome')
                      break
                    case 'cliente_senha':
                      this.setNotificacoes(valor[0], 'Campo da senha')
                      break
                    case 'cliente_telefone_contato':
                      this.setNotificacoes(valor[0], 'Campo de telefone de contato')
                      break
                    default:
                      this.setNotificacoes(
                        'Entre em contato com o suporte CadastroView|CadastroCliente',
                        'Erro interno'
                      )
                  }
                }
              } else if (erro.response.data.erro) {
                this.setNotificacoes(erro.response.data.erro)
              }
              this.loading = false
            })
          this.dispatchNotificacoes()
        }
      }
      if (this.escolhamodalidade == 'dono') {
        if (await this.v$.empresa.$validate() && await this.v$.dono.$validate()) {
          let cadastroEmpresa = new FormData()
          cadastroEmpresa.append('empresa_nome', this.empresa.nome)
          cadastroEmpresa.append('empresa_cnpj', this.empresa.cnpj)
          cadastroEmpresa.append('empresa_descricao', this.empresa.descricao)
          cadastroEmpresa.append('empresa_logo', this.empresa.logo[0])
          axios
            .post(useEndpoints().getCadastroEmpresa, cadastroEmpresa, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((resposta) => {
              axios
                .post(
                  useEndpoints().getCadastroFuncionarioDono,
                  {
                    empresa_id: resposta.data.empresa.id,
                    funcionario_nome: this.dono.nome,
                    funcionario_email: this.dono.email,
                    funcionario_senha: this.dono.senha,
                    cargo: 'Dono',
                    acessos: ['*']
                  },
                  {
                    headers: {
                      Accept: 'application/json'
                    }
                  }
                )
                .then((donoResposta) => {
                  sessionStorage.setItem('token', donoResposta.data.dados.login.token)
                  sessionStorage.setItem(
                    'usuario',
                    JSON.stringify({
                      ...donoResposta.data.dados.login.user,
                      acessos: donoResposta.data.dados.funcionario.acessos
                    })
                  )
                  this.loading = false
                  this.$router.push({ name: 'dashboard' })
                })
                .catch((donoErro) => {
                  console.log(donoErro)
                  if (donoErro.response.data.errors) {
                    const donoErros = Object.entries(donoErro.response.data.errors)
                    for (const [chave, valor] of donoErros) {
                      switch (chave) {
                        case 'funcionario_email':
                          this.setNotificacoes(valor[0], 'Campo de email do dono')
                          break
                        case 'funcionario_nome':
                          this.setNotificacoes(valor[0], 'Campo de nome do dono')
                          break
                        case 'funcionario_senha':
                          this.setNotificacoes(valor[0], 'Campo de senha do dono')
                          break
                        default:
                          this.setNotificacoes(
                            'Entre em contato com o suporte CadastroView|CadastroFuncionarioDono',
                            'Erro interno'
                          )
                      }
                    }
                  } else if (donoErro.response.data.erro) {
                    this.setNotificacoes(donoErro.response.data.erro)
                  }
                  this.loading = false
                })
            })
            .catch((erro) => {
              console.log(erro)
              if (erro.response.data.errors) {
                const erros = Object.entries(erro.response.data.errors)
                for (const [chave, valor] of erros) {
                  switch (chave) {
                    case 'empresa_cnpj':
                      this.setNotificacoes(valor[0], 'Campo de CNPJ')
                      break
                    case 'empresa_descricao':
                      this.setNotificacoes(valor[0], 'Campo de descrição')
                      break
                    case 'empresa_logo':
                      this.setNotificacoes(valor[0], 'Campo de logo')
                      break
                    case 'empresa_nome':
                      this.setNotificacoes(valor[0], 'Campo de nome')
                      break
                    default:
                      this.setNotificacoes(
                        'Entre em contato com o suporte CadastroView|CadastroEmpresa',
                        'Erro interno'
                      )
                  }
                }
              } else if (erro.response.data.erro) {
                this.setNotificacoes(erro.response.data.erro)
              }
              this.loading = false
            })
        }
      }
    },
    ...mapActions(useNotificacoes, ['setNotificacoes', 'dispatchNotificacoes'])
  },
  validations() {
    return {
      cliente: {
        nome: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O nome deve conter até 255 caracteres.', maxLength(255))
        },
        email: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255)),
          email: helpers.withMessage('O email é inválido', email)
        },
        cpf: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(11)),
          validaCPF: helpers.withMessage('CPF inválido', validaCPF)
        },
        senha: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255))
        },
        senhaVerificacao: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255)),
          sameAs: helpers.withMessage(
            'A senha e a confirmação devem ser as mesmas',
            sameAs(this.cliente.senha)
          )
        },
        telefonePessoal: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(20))
        },
        telefoneContato: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(20))
        }
      },
      dono: {
        nome: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O nome deve conter até 255 caracteres.', maxLength(255))
        },
        email: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255)),
          email: helpers.withMessage('O email é inválido', email)
        },
        senha: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255))
        },
        senhaVerificacao: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O email deve conter até 255 caracteres', maxLength(255)),
          sameAs: helpers.withMessage(
            'A senha e a confirmação devem ser as mesmas',
            sameAs(this.dono.senha)
          )
        }
      },
      empresa: {
        nome: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O nome deve conter até 255 caracteres.', maxLength(255))
        },
        cnpj: {
          required: helpers.withMessage('O campo de nome é obrigatório.', required),
          maxLength: helpers.withMessage('O nome deve conter até 14 caracteres.', maxLength(14)),
          validaCNPJ: helpers.withMessage('CNPJ inválido', validaCNPJ)
        }
      }
    }
  }
}
</script>

<style scoped>
main {
  height: 100vh;
}

.container-cadastro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.form-cadastro {
  width: 60%;
  background-color: var(--platinum);
  padding: 2rem;
}
.escolha-modalidade {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding-bottom: 2rem;
}

.escolha-label {
  padding: 0.375rem;
  border-radius: 50px;
  display: inline-flex;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: 0.5rem 0;
  -webkit-tap-highlight-color: transparent;
}

.escolha-label:hover,
.escolha-label:focus-within {
  background: rgba(159, 159, 159, 0.1);
}

.escolha-label input {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: none;
  border: 0;
  box-shadow: inset 0 0 0 1px #9f9f9f;
  box-shadow: inset 0 0 0 1.5px #9f9f9f;
  appearance: none;
  padding: 0;
  margin: 0;
  transition: box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25);
  pointer-events: none;
}

.escolha-label input:focus {
  outline: none;
}
.escolha-label input:checked {
  box-shadow: inset 0 0 0 6px #6743ee;
}
.escolha-label span {
  vertical-align: middle;
  display: inline-block;
  line-height: 20px;
  padding: 0 8px;
}
</style>
