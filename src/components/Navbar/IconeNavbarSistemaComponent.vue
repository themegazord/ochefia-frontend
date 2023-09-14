<template>
  <v-icon v-bind="bind" icon="fas fa-caret-down" @click="rodou" :class="{ rodou: roda }"></v-icon>
</template>

<script>
export default {
  props: {
    bind: {
      type: Object,
      required: true
    }
  },
  methods: {
    rodou() {
      this.roda = !this.roda
    }
  },
  data() {
    return {
      roda: false
    }
  }
}
</script>

<style>
.rodou {
  transform: rotate(-90deg);
  transition: transform .5s ease;
  cursor: pointer;
}
</style>