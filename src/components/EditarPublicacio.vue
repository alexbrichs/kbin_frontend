<template>
  <BarraBase v-model:actiu="actiu">
    <template v-if="Carregat">
      <div id="middle" class="page-entry-create page-entry-create-link">
        <div class="kbin-container">
          <main id="main" data-controller="lightbox timeago" class="">
            <ShowThreads :key="publicacio.id" :thread="publicacio">></ShowThreads>
            <div id="content" class="section">
              <div class="container" data-controller="entry-link-create">
                <form name="entry_link" class="entry-create">
                  <div v-if="publicacio.url">
                    <label for="entry_link_title" class="required">URL</label>
                    <textarea id="entry_link_title" name="url" required="required" data-input-length-max-value="255"
                              style="overflow: hidden; height: 66px; cursor: default" disabled="">www.google.cat
                            </textarea>
                  </div>
                  <div>
                    <label for="entry_link_title" class="required">Title</label>
                    <textarea id="entry_link_title" name="title" required="required" data-input-length-max-value="255"
                              v-model="newTitle"
                              style="overflow: hidden; height: 66px;">
                    </textarea>
                  </div>
                  <div>
                    <textarea id="entry_link_body" name="body" placeholder="Body"
                              data-input-length-max-value="35000" v-model="newBody"
                              style="overflow: hidden; height: 66px;">
                    </textarea>
                  </div>
                  <div style="width: 100%;">
                    <label for="magazine_select" style="display: block; margin-bottom: 5px;">Magazine</label>
                    <select name="magazine" id="magazine_select"
                            style="width: 100%; border-style: solid; height: 50px ;cursor: default" required="required"
                            disabled="">
                      <option value="" selected="">{{ nomMagazine }}</option>
                    </select>
                  </div>
                  <div class="row actions">
                    <ul>
                      <li>
                        <div>
                          <button
                                  class="btn btn__primary" @click.prevent="editPublicacio">Edit thread
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
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


export default {
  name: 'EditarPublicacio',
  components: {
    ShowThreads,
    BarraBase,
  },
  data() {
    return {
      actiu: '',
      publicacio: Object,
      id: '',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      Carregat: false,
      newTitle: '',
      newBody: '',
      nomMagazine: '',
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
    this.newTitle = this.publicacio.title;
    if (this.publicacio.body) {
      this.newBody = this.publicacio.body;
    }
  },
  methods: {
    async fetchPublicacio() {
      const response = await axios.get(`${this.api}/publicacions/${this.id}/`);
      this.publicacio = response.data;
      const response2 = await axios.get(`${this.api}/magazine/${this.publicacio.magazine}/`)
      this.nomMagazine = response2.data.name;
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
    },
    async editPublicacio() {
      console.log(this.newTitle)
      // console.log(this.newBody)
      const userToken = localStorage.getItem('authToken');
      await axios.put(
          `${this.api}/publicacions/${this.id}/`,
          {
            "title": this.newTitle,
            "body": this.newBody,
          },
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      localStorage.setItem('edited','true')
      this.$router.push({ path: `/thread/${this.id}/top`});

    }
  }
}
</script>