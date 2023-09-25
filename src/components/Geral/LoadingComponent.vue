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
        <h3>{{ info }}</h3>
    </v-dialog>
</template>

<script>
import { useInfoLoading } from '../../stores/infoLoading';
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
    },
    setup() {
        const info = useInfoLoading().getInfo
        return { info }
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