<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus"/>
    <v-main>
      <h1>Dashboard</h1>
    </v-main>
  </v-layout>
</template>

<script>
import { useNavbarSistemaLinksStore } from '../../stores/navbarSistemaLinks'
import NavbarSistemaComponent from '../../components/Navbar/NavbarSistemaComponent.vue'
export default {
  components: {
    NavbarSistemaComponent
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().getSubMenus
    }
  },
  created() {
    this.links = useNavbarSistemaLinksStore().getLinks
  }
}
</script>

<style>
</style>