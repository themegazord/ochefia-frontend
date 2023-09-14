<template>
  <Navbar :links="links"/>
  <main>
    <div class="container-home">
      <div class="container-home-info">
        <NomeRoullete texto="O sistema feito sob medida para controlar " />
        <h5 class="subtitulo">
          Controle seus pedidos delivery, vendas, estoque de uma forma fácil e rápida, no seu
          computador ou celular.
        </h5>
      </div>
      <div class="container-home-mockup">#</div>
    </div>
  </main>
</template>

<script>
import NomeRoullete from "../../components/Home/NomeRoullete.vue"
import Navbar from "../../components/Navbar/NavbarComponent.vue";
import { useNavbarLinksStore } from "../../stores/navbarLinks";
export default {
  components: {
    NomeRoullete,
    Navbar
  },
  data() {
    return {
      links: useNavbarLinksStore().getLinks
    }
  }
}
</script>

<style scoped>
.container-home {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 2560px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 2560) / 1920);
    padding: calc((10.625rem * 2560) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 2560) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 2560) / 1920);
  }
}
@media (max-width: 1920px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1920) / 1920);
    padding: calc((10.625rem * 1920) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1920) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1920) / 1920);
  }
}
@media (max-width: 1600px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1600) / 1920);
    padding: calc((10.625rem * 1600) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1600) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1600) / 1920);
  }
}
@media (max-width: 1440px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1440) / 1920);
    padding: calc((10.625rem * 1440) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1440) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1440) / 1920);
  }
}
@media (max-width: 1366px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1366) / 1920);
    padding: calc((10.625rem * 1366) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1366) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1366) / 1920);
  }
}
@media (max-width: 1280px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1280) / 1920);
    padding: calc((10.625rem * 1280) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1280) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1280) / 1920);
  }
}
@media (max-width: 1024px) {
  .container-home-info {
    display: flex;
    flex-direction: column;
    gap: calc((5.625rem * 1024) / 1920);
    padding: calc((10.625rem * 1024) / 1920);
  }

  .subtitulo {
    font-size: calc((1.625rem * 1024) / 1920);
    font-family: 'Poppins', sans-serif;
    color: var(--steel-blue);
    font-weight: 400;
    width: calc((30rem * 1024) / 1920);
  }
}
</style>