<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-cadastro-prazopgto">
        <h2>Aqui você poderá cadastrar novos prazos de pagamento!</h2>
        <form class="form-cadastro-prazopgto" @submit.prevent="cadastrar">
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="text"
                v-model="prazopgto.prazopgto_nome"
                :error-messages="v$.prazopgto.prazopgto_nome.$errors.map((e) => e.$message)"
                counter="155"
                label="Insira o nome do prazo de pagamento"
                @input="v$.prazopgto.prazopgto_nome.$touch"
                @blur="v$.prazopgto.prazopgto_nome.$touch"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <v-select
                :items="prazopgto_tipos"
                item-title="nome"
                item-value="valor"
                label="Insira o tipo do prazo de pagamento"
                v-model="prazopgto.prazopgto_tipo"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9">
              <v-card variant="outlined">
                <v-card-title class="text-overline"
                  >Selecione o(s) tipo(s) da(s) forma(s) para o prazo de pagamento</v-card-title
                >
                <v-card-item>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Dinheiro"
                        value="DIN"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Cartão de Crédito"
                        value="CDC"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Cartão de Débito"
                        value="CDB"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Boleto"
                        value="BOL"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Vale de alimentação"
                        value="VAL"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="prazopgto.prazopgto_tipoforma"
                        label="Vale de refeição"
                        value="VRE"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card variant="outlined" title="Insira os prazos">
                <v-form
                  @submit.prevent="addPrazo"
                  class="d-flex align-center justify-space-evenly px-2"
                >
                  <v-text-field
                    v-model="prazoatual"
                    type="number"
                    label="Insira o prazo"
                    :disabled="prazopgto.prazopgto_tipo == 'V'"
                  ></v-text-field>
                  <v-btn
                    variant="tonal"
                    color="var(--green-confirm)"
                    type="submit"
                    :disabled="prazoatual.trim().length == 0"
                    >Adicionar</v-btn
                  >
                </v-form>
                <v-card variant="outlined" class="mx-2 my-2 d-flex flex-wrap py-2">
                  <v-card-title class="text-overline">Prazos:</v-card-title>
                  <v-chip v-for="(prazo, index) in prazos" :key="index" @click="removePrazo(index)">
                    {{ prazo }}
                  </v-chip>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="pt-2">
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
      prazopgto: {
        empresa_id: JSON.parse(atob(useEndpoints().getEmpresaToken)).empresa_id,
        prazopgto_nome: '',
        prazopgto_tipo: undefined,
        prazopgto_tipoforma: []
      },
      parcelas: [],
      prazopgto_tipos: [
        {
          nome: 'A Vista',
          valor: 'V'
        },
        {
          nome: 'A Prazo',
          valor: 'P'
        },
        {
          nome: 'A Especificar',
          valor: 'E'
        }
      ],
      prazos: [],
      prazoatual: ''
    }
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    async cadastrar() {
      if (await this.v$.prazopgto.$validate()) {
        this.loading = true
        axios
          .post(
            useEndpoints().getCadastroPrazoPgto,
            {
              empresa_id: this.prazopgto.empresa_id,
              prazopgto_nome: this.prazopgto.prazopgto_nome,
              prazopgto_tipo: this.prazopgto.prazopgto_tipo,
              prazopgto_tipoforma: this.prazopgto.prazopgto_tipoforma.join()
            },
            {
              headers: {
                Accept: 'application/json',
                Authorization: useEndpoints().getToken
              }
            }
          )
          .then((res) => {
            if (this.prazos.length != 0) {
              this.prazos.forEach((e) => {
                this.parcelas.push({
                  prazopgto_id: res.data.prazopgto.id,
                  dias: parseInt(e)
                })
              })
              axios
                .post(
                  useEndpoints().getCadastroPrazoPgtoDias,
                  {
                    parcelas: this.parcelas
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: useEndpoints().getToken
                    }
                  }
                )
                .then((prazopgtodias_res) => {
                  this.setNotificacoes(`${prazopgtodias_res.data.mensagem}`, 'Sucesso', 'sucesso')
                })
                .catch((prazopgtodias_err) => {
                  if (
                    prazopgtodias_err.response.data.errors ||
                    prazopgtodias_err.response.data.erro
                  ) {
                    this.setNotificacoes(
                      `Entre em contato com o suporte CadastroPrazoPgtoDias`,
                      'Erro',
                      'erro'
                    )
                  }
                })
            }
            this.setNotificacoes(
              `${res.data.mensagem} -> ${res.data.prazopgto.prazopgto_nome}`,
              'Sucesso',
              'sucesso'
            )
            this.loading = false
          })
          .catch((err) => {
            if (err.response.data.errors) {
              const erros = Object.entries(err.response.data.errors)
              for (const [chave, valor] of erros) {
                switch (chave) {
                  case 'prazopgto_nome':
                    this.setNotificacoes(valor[0], 'Campo de nome do prazo', 'erro')
                    break
                  case 'prazopgto_tipo':
                    this.setNotificacoes(valor[0], 'Campo de tipo do prazo', 'erro')
                    break
                  case 'prazopgto_tipoforma':
                    this.setNotificacoes(valor[0], 'Campo de formas do prazo', 'erro')
                    break
                  default:
                    this.setNotificacoes(
                      'Entre em contato com o suporte CadastroprazopgtoView|Cadastroprazopgto',
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
    },
    addPrazo() {
      this.prazos.push(this.prazoatual)
      this.prazoatual = ''
    },
    removePrazo(index) {
      this.prazos.splice(index, 1)
    }
  },
  validations() {
    return {
      prazopgto: {
        prazopgto_nome: {
          required: helpers.withMessage(
            'Esse campo é obrigatório, por favor, informe-o.',
            required
          ),
          maxLength: helpers.withMessage(
            'Esse campo tem que conter no máximo 155 caracteres.',
            maxLength(155)
          )
        }
      }
    }
  }
}
</script>

<style scoped>
.container-cadastro-prazopgto {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.form-cadastro-prazopgto {
  padding: 3rem;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>