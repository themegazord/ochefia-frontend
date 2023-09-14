<template>
  <!-- <nav>
    <ul>
      <router-link to="/estoque/grupo/listagem">Listagem grupos</router-link>
      <router-link to="/estoque/grupo/cadastro">Cadastro de grupo</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </ul>
  </nav>
  <h1>dashboard</h1> -->
  <v-layout>
    <NavbarSistema :links="links"/>
    <v-app-bar>Dashboard</v-app-bar>
    <v-main>
      <h1>cad grupo</h1>
    </v-main>
  </v-layout>
</template>

<script>
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
export default {
  components: {
    NavbarSistema: () => import('../../../components/Navbar/NavbarSistemaComponent.vue')
  },
  data() {
    return {
      links: useNavbarSistemaLinksStore().getLinks
    }
  },
  mounted() {
    this.links = useNavbarSistemaLinksStore().getLinks
  }
}
</script>

<style>
</style>