<template>
  <v-navigation-drawer width="320" class="bg-blue-darken-2 nav">
    <v-list>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="index"
        :prepend-icon="menu.icon"
        class="nav-link"
      >
        <router-link :to="menu.url">{{ menu.label }}</router-link>
      </v-list-item>
      <v-list-group
        v-for="(grupo, subMenuIndex) in subMenus"
        :key="subMenuIndex"
        :value="grupo.label"
      >
        <template v-slot:activator="{ props }">
          <v-list-item :prepend-icon="grupo.icon" v-bind="props" :title="grupo.label"></v-list-item>
        </template>
        <v-list-item
          v-for="(subitem, i) in grupo.subitens"
          :key="i"
          :value="subitem.label"
          class="nav-link"
        >
          <router-link :to="subitem.url">{{ subitem.label }}</router-link>
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block class="bg-red" @click="logout"> Sair </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  props: {
    menus: {
      type: Object,
      required: true
    },
    subMenus: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('usuario')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.nav {
  height: 100vh;
}

.nav-link {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
  background-color: rgba(187, 222, 251, 0.04);
}

.nav-link a {
  color: white;
  text-decoration: none;
}
</style>