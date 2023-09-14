<template>
    <v-dialog
    v-model="mostraModal"
    width="auto"
    >
        <v-progress-circular
        v-if="loading"
        :size="80"
        :width="10"
        indeterminate>
        </v-progress-circular>
    </v-dialog>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        mostraModal() {
            return this.loading
        }
    }
}
</script>

<style scoped>
.mensagem-sucesso {
    color: green;
    font-weight: bold;
  }
  
.mensagem-erro {
color: red;
font-weight: bold;
}
</style>