<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <v-main>
      <div class="container-listagem-unidade">
        <h2>
          Aqui, você vai ver suas unidades de medida cadastrados e poderá editá-los, excluí-los ou criar
          novas unidades de medida.
        </h2>
        <div class="container-cadastro-unidade">
          <v-btn
            prepend-icon="fas fa-plus"
            class="criar"
            variant="tonal"
            @click="$router.push({ path: 'cadastro' })"
            >Criar</v-btn
          >
        </div>
        <v-table
          density="compact"
          fixed-header
          height="400"
          v-if="unidades.length != 0"
          class="tabela-unidades"
        >
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unidade in unidades" :key="unidade.unidade_id">
              <td>{{ unidade.unidade_id }}</td>
              <td>{{ unidade.unidade_nome }}</td>
              <td class="acoes">
                <v-btn
                  density="compact"
                  icon="fas fa-magic"
                  variant="flat"
                  @click="$router.push({ path: `edicao/${unidade.unidade_id}` })"
                ></v-btn>
                <v-dialog width="500">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      density="compact"
                      icon="fas fa-trash"
                      variant="flat"
                      v-bind="props"
                    ></v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Remoção da unidade de medida do produto">
                      <v-card-text> Você deseja remover esta unidade de medida do produto? </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          text="Cancelar"
                          @click="isActive.value = false"
                          color="var(--green-confirm)"
                          variant="tonal"
                        ></v-btn>
                        <v-btn
                          text="Remover"
                          @click="remocao(unidade.unidade_id)"
                          variant="tonal"
                          prepend-icon="fas fa-trash"
                          :disabled="removido"
                          color="var(--vermilion)"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <h2 class="sem-grupos" v-if="unidades.length == 0">Sem unidades de medida cadastrados</h2>
    </v-main>
  </v-layout>
</template>

<script>
import axios from 'axios'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import { useEndpoints } from '../../../stores/endpoints'
import { mapActions } from 'pinia'
import { useNotificacoes } from '../../../stores/notificacao'
export default {
  components: {
    LoadingComponent,
    NotificacaoComponent,
    NavbarSistemaComponent
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().subMenus,
      loading: false,
      removido: false,
      unidades: []
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(useEndpoints().getListagemUnidadeProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.unidades = res.data.unidades
        this.loading = false
      })
      .catch((err) => {
        if (err.data.response.error) {
          this.setNotificacoes(
            `Erro interno listagem de unidades de medida => ${err.data.response.error}`,
            'Erro',
            'erro'
          )
          this.loading = false
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    remocao(id) {
      this.loading = true
      axios
        .delete(`${useEndpoints().getRemocaoUnidadeProduto}${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: useEndpoints().getToken
          }
        })
        .then((res) => {
          if (res.status == 204) {
            this.setNotificacoes('Unidade de medida removida com sucesso', 'Sucesso', 'sucesso')
            this.removido = true
            this.loading = false
            setTimeout(() => {
              this.$router.go()
            }, 3000)
          }
        })
        .catch((err) => {
          if (err.response.data.erro) {
            this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
          }
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.container-listagem-unidade {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-unidade {
  display: flex;
  justify-content: end;
  padding: 3rem 0;
}

.criar {
  color: var(--green-confirm);
}

.acoes {
  display: flex;
  gap: 0.5rem;
}
</style>