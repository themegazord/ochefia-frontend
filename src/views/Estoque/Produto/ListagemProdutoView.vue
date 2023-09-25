<template>
  <v-layout>
    <NavbarSistemaComponent :menus="menus" :subMenus="subMenus" />
    <NotificacaoComponent />
    <LoadingComponent :loading="loading" />
    <v-main>
      <div class="container-listagem-produto">
        <h2>
          Aqui, você vai ver seus produtos cadastrados e poderá editá-los, excluí-los ou criar
          novos produtos.
        </h2>
        <div class="container-cadastro-produto">
          <v-btn
            prepend-icon="fas fa-plus"
            class="criar"
            variant="tonal"
            @click="$router.push({ path: 'cadastro' })"
            >Criar</v-btn
          >
        </div>
        <v-table
          density="compact"
          fixed-header
          height="400"
          v-if="produtos.length != 0"
          class="tabela-produtos"
        >
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Estoque</th>
              <th class="text-left">Preço de Venda</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.produto_id">
              <td>{{ produto.produto_id }}</td>
              <td>{{ produto.produto_nome }}</td>
              <td>{{ produto.produto_estoque }}</td>
              <td>R$ {{ produto.produto_preco }}</td>
              <td class="acoes">
                <v-btn
                  density="compact"
                  icon="fas fa-magic"
                  variant="flat"
                  @click="$router.push({ path: `edicao/${produto.produto_id}` })"
                ></v-btn>
                <v-dialog width="500">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      density="compact"
                      icon="fas fa-trash"
                      variant="flat"
                      v-bind="props"
                    ></v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Remoção da produto de medida do produto">
                      <v-card-text> Você deseja remover este produto? </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          text="Cancelar"
                          @click="isActive.value = false"
                          color="var(--green-confirm)"
                          variant="tonal"
                        ></v-btn>
                        <v-btn
                          text="Remover"
                          @click="remocao(produto.produto_id)"
                          variant="tonal"
                          prepend-icon="fas fa-trash"
                          :disabled="removido"
                          color="var(--vermilion)"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <h2 class="sem-grupos" v-if="produtos.length == 0">Sem produtos cadastrados</h2>
    </v-main>
  </v-layout>
</template>

<script>
import axios from 'axios'
import LoadingComponent from '../../../components/Geral/LoadingComponent.vue'
import NotificacaoComponent from '../../../components/Geral/NotificacaoComponent.vue'
import NavbarSistemaComponent from '../../../components/Navbar/NavbarSistemaComponent.vue'
import { useNavbarSistemaLinksStore } from '../../../stores/navbarSistemaLinks'
import { useEndpoints } from '../../../stores/endpoints'
import { mapActions } from 'pinia'
import { useNotificacoes } from '../../../stores/notificacao'
export default {
  components: {
    LoadingComponent,
    NotificacaoComponent,
    NavbarSistemaComponent
  },
  data() {
    return {
      menus: useNavbarSistemaLinksStore().getMenus,
      subMenus: useNavbarSistemaLinksStore().subMenus,
      loading: false,
      removido: false,
      produtos: []
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(`${useEndpoints().getListagemProduto}${useEndpoints().getEmpresaToken}`, {
        headers: {
          Authorization: useEndpoints().getToken
        }
      })
      .then((res) => {
        this.produtos = res.data.produtos
        this.loading = false
      })
      .catch((err) => {
        if (err.data.response.error) {
          this.setNotificacoes(
            `Erro interno listagem de produtos => ${err.data.response.error}`,
            'Erro',
            'erro'
          )
          this.loading = false
        }
      })
  },
  methods: {
    ...mapActions(useNotificacoes, ['setNotificacoes']),
    remocao(id) {
      this.loading = true
      axios
        .delete(`${useEndpoints().getRemocaoProduto}${useEndpoints().getEmpresaToken}/${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: useEndpoints().getToken
          }
        })
        .then((res) => {
          if (res.status == 204) {
            this.setNotificacoes('Produto removido com sucesso', 'Sucesso', 'sucesso')
            this.removido = true
            this.loading = false
            setTimeout(() => {
              this.$router.go()
            }, 3000)
          }
        })
        .catch((err) => {
          if (err.response.data.erro) {
            this.setNotificacoes(err.response.data.erro, 'Erro', 'erro')
          }
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.container-listagem-produto {
  padding: 4rem;
  font-family: 'Poppins', sans-serif;
  width: 90%;
}

.container-cadastro-produto {
  display: flex;
  justify-content: end;
  padding: 3rem 0;
}

.criar {
  color: var(--green-confirm);
}

.acoes {
  display: flex;
  gap: 0.5rem;
}
</style>