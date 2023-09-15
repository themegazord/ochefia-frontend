<template>
  <div class="container-notificacao">
    <transition-group name="fade">
        <div class="notificacao" v-for="(notificacao, index) in notificacoes" :key="index" :class="setTipoNotificacao(notificacao.tipo)">
            <p class="titulo-notificacao">{{ notificacao.titulo }}</p>
            <p class="conteudo-notificacao">{{ notificacao.notificacao }}</p>
        </div>
    </transition-group>
  </div>
</template>
<script>
import { watch } from 'vue';
import { useNotificacoes } from '../../stores/notificacao';
export default {
    methods: {
        setTipoNotificacao(tipo) {
            if (tipo == 'sucesso') {
                return { 'sucesso': true }
            } else if (tipo == 'info') {
                return { 'info': true }
            } else {
                return { 'erro': true }
            }
        }
    },
    setup() {
        const store = useNotificacoes();
        const notificacoes = store.getNotificacoes;

        watch(
            notificacoes,
            () => {
                if (notificacoes.length > 0) {
                    setTimeout(() => {
                        store.dispatchNotificacoes()
                    }, 4000)
                }
            }
        );

        return {
            notificacoes
        }
    }
}
</script>

<style scoped>
.info {
    background-color: var(--dodger-blue);
}
.erro {
    background-color: var(--vermilion);
}
.sucesso {
    background-color: var(--green-confirm);
}
.container-notificacao {
    position: absolute;
    right: 0;
    top: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20%;
    z-index: 10000;
}
.notificacao {
    width: 90%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.conteudo-notificacao,
.titulo-notificacao {
    font-family: 'Poppins', sans-serif;
    color: var(--platinum);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>