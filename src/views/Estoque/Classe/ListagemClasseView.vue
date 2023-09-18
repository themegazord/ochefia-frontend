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
      classes: []
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