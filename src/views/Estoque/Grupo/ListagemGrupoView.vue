<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus"/>
    <v-app-bar class="pl-6">Estoque</v-app-bar>
    <v-main>
      <div class="container-listagem-grupos">
        <h2>Aqui, você vai ver seus grupos cadastrados e poderá editá-los, excluí-los ou criar novos grupos.</h2>
        <div class="container-cadastro-grupo">
          <v-btn prepend-icon="fas fa-plus" class="criar" variant="tonal" @click="$router.push({ path: 'cadastro' })">Criar</v-btn>
        </div>
        <v-table density="compact" fixed-header height="400" v-if="grupos.length != 0" class="">
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Tipo</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="grupo in grupos"
              :key="grupo.grupo_produto_id"
            >
              <td>{{ grupo.grupo_produto_id }}</td>
              <td>{{ grupo.grupo_produto_nome }}</td>
              <td>{{ grupo.grupo_produto_tipo }}</td>
              <td class="acoes">
                <v-btn density="compact" icon="fas fa-magic" variant="flat" @click="$router.push({ path: `edicao/${grupo.grupo_produto_id}` })"></v-btn>
                <v-btn density="compact" icon="fas fa-trash" variant="flat"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <h2 class="sem-grupos" v-if="grupos.length == 0">Sem grupos cadastros</h2>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import axios from 'axios'
import { useEndpoints } from '../../../stores/endpoints'
export default {
  components: {
    NavbarSistemaComponent
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().getSubMenus,
      grupos: []
    }
  },
  mounted() {
    axios
      .get(useEndpoints().getListagemGrupoProduto, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      })
      .then((resposta) => {
        this.grupos = resposta.data.grupos
      })
      .catch((erro) => {
        console.log(erro)
      })
  }
}
</script>

<style scoped>

.container-listagem-grupos {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-grupo {
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