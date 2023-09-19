<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <v-main>
      <div class="container-listagem-classe">
        <h2>
          Aqui, você vai ver suas classes cadastradas e poderá editá-las, excluí-las ou criar novas
          classes.
        </h2>
        <div class="container-cadastro-classe">
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
          v-if="classes.length != 0"
          class="tabela-classes"
        >
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="classe in classes" :key="classe.classe_produto_id">
              <td>{{ classe.classe_produto_id }}</td>
              <td>{{ classe.classe_produto_nome }}</td>
              <td class="acoes">
                <v-btn
                  density="compact"
                  icon="fas fa-magic"
                  variant="flat"
                  @click="$router.push({ path: `edicao/${classe.classe_produto_id}` })"
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
                    <v-card title="Remoção de grupo de produto">
                      <v-card-text> Você deseja remover este grupo de produto? </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          text="Cancelar"
                          @click="isActive.value = false"
                          :disabled="indisponivel"
                        ></v-btn>
                        <v-btn
                          text="Remover"
                          @click="remocaoClasseProduto(classe.classe_produto_id)"
                          variant="flat"
                          :disabled="indisponivel"
                          prepend-icon="fas fa-trash"
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
      <h2 class="sem-grupos" v-if="classes.length == 0">Sem classes cadastrados</h2>
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
      loading: false,
      menus: useNavbarSistemaLinksStore().menus,
      subMenus: useNavbarSistemaLinksStore().subMenus,
      classes: [],
      indisponivel: false
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(useEndpoints().getListagemClasseProduto, {
        headers: {
          Accept: 'application/json',
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.classes = res.data.classes
        this.loading = false
      })
      .catch((err) => {
        if (err.data.response.error) {
          this.loading = false
          this.setNotificacoes(
            `Erro interno listagem de classes => ${err.data.response.error}`,
            'Erro',
            'erro'
          )
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    remocaoClasseProduto(id) {
      this.loading = true
      axios
        .delete(`${useEndpoints().getRemocaoClasseProduto}${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: useEndpoints().getToken
          }
        })
        .then((res) => {
          if (res.status == 204) {
            this.loading = false
            this.indisponivel = true
            this.setNotificacoes('Classe removida com sucesso', 'Sucesso', 'sucesso')
            setTimeout(() => {
              this.$router.go()
            }, 3000)
          }
        })
        .catch((err) => {
          if (err.response.data.erro) {
            this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
            this.loading = false
          }
        })
    }
  }
}
</script>

<style scoped>
.container-listagem-classe {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-classe {
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