<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <v-main>
      <div class="container-listagem-fabricante">
        <h2>
          Aqui, você vai ver seus fabricantes cadastrados e poderá editá-los, excluí-los ou criar novos
          fabricantes.
        </h2>
        <div class="container-cadastro-fabricante">
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
          v-if="fabricantes.length != 0"
          class="tabela-fabricantes"
        >
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fabricante in fabricantes" :key="fabricante.fabricante_produto_id">
              <td>{{ fabricante.fabricante_produto_id }}</td>
              <td>{{ fabricante.fabricante_produto_nome }}</td>
              <td class="acoes">
                <v-btn
                  density="compact"
                  icon="fas fa-magic"
                  variant="flat"
                  @click="$router.push({ path: `edicao/${fabricante.fabricante_produto_id}` })"
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
                    <v-card title="Remoção de fabricante de produto">
                      <v-card-text> Você deseja remover este fabricante de produto? </v-card-text>
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
                          @click="remocao(fabricante.fabricante_produto_id)"
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
      <h2 class="sem-grupos" v-if="fabricantes.length == 0">Sem fabricantes cadastrados</h2>
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
      fabricantes: []
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(useEndpoints().getListagemFabricanteProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.fabricantes = res.data.fabricantes
        this.loading = false
      })
      .catch((err) => {
        if (err.data.response.error) {
          this.setNotificacoes(
            `Erro interno listagem de farbicantes => ${err.data.response.error}`,
            'Erro',
            'erro'
          )
          this.loading = false
        }
      })
  }
}
</script>

<style scoped>
.container-listagem-fabricante {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-fabricante {
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