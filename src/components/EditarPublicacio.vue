<template>
  <BarraBase v-model:actiu="actiu">
    <template v-if="Carregat">
      <div id="middle" class="page-entry-create page-entry-create-link">
        <div class="kbin-container">
          <main id="main" data-controller="lightbox timeago" class="">
            <ShowThreads :key="publicacio.id" :thread="publicacio">></ShowThreads>
          </main>
        </div>
      </div>
    </template>
  </BarraBase>
</template>


<script>
import BarraBase from "@/components/BarraBase.vue";
import axios from "axios";
import ShowThreads from "@/components/ShowThreads.vue";
// import ShowThreads from "@/components/ShowThreads.vue";


export default {
  name: 'EditarPublicacio',
  components: {
    ShowThreads,
    // ShowThreads,
    BarraBase,
  },
  data() {
    return {
      actiu: '',
      publicacio: Object,
      id: '',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      Carregat: false,
    }
  },
  async mounted() {
    const userToken = localStorage.getItem('authToken');
    if (userToken === null) {
      localStorage.setItem('NoLoguejat', 'true');
      this.$router.push('/')
      return;
    }
    const {id} = this.$route.params;
    this.id = id;
    await this.fetchPublicacio();
    await this.comprovarUsuari();
    this.Carregat = true;
    this.actualitzarTitol();

  },
  methods: {
    async fetchPublicacio() {
      const response = await axios.get(`${this.api}/publicacions/${this.id}/`);
      this.publicacio = response.data;
    },
    actualitzarTitol() {
      if (this.publicacio.url === null) {
        document.title = 'Edit thread - kbin.social';
        this.$emit('update:actiu', '');
      } else {
        document.title = 'Edit link - kbin.social';
        this.$emit('update:actiu', '');
      }
    },
    async comprovarUsuari() {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) this.UsuariIncorrecte();
      const response = await axios.get(
          `${this.api}/u/${this.publicacio.author}/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      const token_thread = response.data.token;
      if (userToken !== token_thread) this.UsuariIncorrecte();
    },
    UsuariIncorrecte() {
      localStorage.setItem('NoLoguejat', 'true');
      this.$router.push('/')
    }
  }
}
</script>