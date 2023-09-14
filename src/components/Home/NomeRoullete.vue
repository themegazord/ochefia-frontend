<template>
  <div>
    <h3 class="titulo">
      {{ texto
      }}<transition name="fade" mode="out-in"
        ><component :is="type" :key="nome">{{ nome }}</component></transition
      >
    </h3>
  </div>
</template>
  
  <script>
export default {
  props: {
    texto: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      arrayNomes: ['seu bar.', 'seu restaurante.', 'seu mercado.', 'sua mercearia.'],
      atualIndex: 0,
      nome: 'bar.',
      alternando: false,
      type: 'span'
    }
  },
  mounted() {
    this.nomeEstabelecimento()
  },
  methods: {
    nomeEstabelecimento() {
      if (!this.alternando) {
        this.alternando = true
        setInterval(() => {
          if (this.atualIndex !== this.arrayNomes.length - 1) {
            this.atualIndex++
            this.nome = this.arrayNomes[this.atualIndex]
          } else {
            this.atualIndex = 0
            this.nome = this.arrayNomes[this.atualIndex]
          }
        }, 3000)
      }
    }
  }
}
</script>
  
  <style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 2560px) {
  .titulo {
    font-size: calc((3.25rem * 2560) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 2560) / 1920);
  }
}
@media (max-width: 1920px) {
  .titulo {
    font-size: calc((3.25rem * 1920) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1920) / 1920);
  }
}
@media (max-width: 1600px) {
  .titulo {
    font-size: calc((3.25rem * 1600) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1600) / 1920);
  }
}
@media (max-width: 1440px) {
  .titulo {
    font-size: calc((3.25rem * 1440) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1440) / 1920);
  }
}
@media (max-width: 1366px) {
  .titulo {
    font-size: calc((3.25rem * 1366) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1366) / 1920);
  }
}
@media (max-width: 1280px) {
  .titulo {
    font-size: calc((3.25rem * 1280) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1280) / 1920);
  }
}
@media (max-width: 1024px) {
  .titulo {
    font-size: calc((3.25rem * 1024) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 500;
    width: calc((40rem * 1024) / 1920);
  }
}
</style>