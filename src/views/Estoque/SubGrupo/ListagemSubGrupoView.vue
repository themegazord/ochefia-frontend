<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <v-main>
      <div class="container-listagem-subgrupo">
        <h2>Aqui, você vai ver seus grupos cadastrados e poderá editá-los, excluí-los ou criar novos sub grupos.</h2>
        <div class="container-cadastro-subgrupo">
          <v-btn prepend-icon="fas fa-plus" class="criar" variant="tonal" @click="$router.push({ path: 'cadastro' })">Criar</v-btn>
        </div>
        <v-table density="compact" fixed-header height="400" v-if="subgrupos.length != 0" class="tabela-subgrupos">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Nome</th>
            <th class="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subgrupo in subgrupos" :key="subgrupo.sub_grupo_produto_id">
            <td>{{ subgrupo.sub_grupo_produto_id }}</td>
            <td>{{ subgrupo.sub_grupo_produto_nome }}</td>
            <td class="acoes"></td>
          </tr>
        </tbody>
      </v-table>
      </div>
      <h2 class="sem-grupos" v-if="subgrupos.length == 0">Sem subgrupos cadastrados</h2>
    </v-main>
  </v-layout>
</template>

<script>
import axios from 'axios';
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue';
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue';
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue';
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks';
import { useEndpoints } from '../../../stores/endpoints';
import { mapActions } from 'pinia';
import { useNotificacoes } from '../../../stores/notificacao';
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
      subgrupos: []
    }
  },
  mounted() {
    axios
      .get(useEndpoints().getListagemSubGrupoProduto, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.subgrupos = res.data.subgrupos
      })
      .catch((err) => {
        if (err.data.response.error) {
          this.setNotificacoes(`Erro interno listagem de subgrupos => ${err.data.response.error}`, 'Erro', 'erro')
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes'])
  }
}
</script>

<style scoped>
.container-listagem-subgrupo {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-subgrupo {
  display: flex;
  justify-content: end;
  padding: 3rem 0;
}

.criar {
  color: var(--green-confirm);
}

.acoes {
  display: flex;
  gap: .5rem;
}
</style>