<template>
  <BarraBase>
    <div id="middle" class="page-entry-create page-entry-create-link">
      <div class="kbin-container">
        <main id="main" class="" v-lightbox v-timeago>
          <BarraNew actiu="thread">
            <div id="content" class="section">
              <div class="container" v-entry-link-create>
                <form @submit.prevent="submitForm" class="entry-create" enctype="multipart/form-data">
                  <div>
                    <label for="entry_link_title" class="required">Title</label>
                    <textarea id="entry_link_title" v-model="title" required data-input-length-max-value="255"
                              style="overflow: hidden; height: 66px;"></textarea>
                  </div>
                  <div>
                    <textarea id="entry_link_body" v-model="body" placeholder="Body" data-input-length-max-value="35000"
                              style="overflow: hidden; height: 66px;"></textarea>
                  </div>
                  <div style="width: 100%;">
                    <label for="magazine_select" style="display: block; margin-bottom: 5px;">Magazine</label>
                    <select v-model="selectedMagazine" id="magazine_select"
                            style="width: 100%; border-style: solid; height: 50px" required>
                      <option value="" disabled hidden>Select a Magazine</option>
                      <option v-for="magazine in magazines" :key="magazine.id" :value="magazine.id">{{
                          magazine.name
                        }}
                      </option>
                    </select>
                  </div>
                  <div class="row actions">
                    <ul>
                      <li>
                        <div>
                          <button type="submit" id="entry_link_submit" class="btn btn__primary">Add new thread</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </BarraNew>
        </main>
      </div>
    </div>
  </BarraBase>
</template>

<script>
import axios from 'axios';
import BarraBase from "@/components/BarraBase.vue";
import BarraNew from "@/components/BarraNew.vue";

export default {
  name: 'CrearThread',
  components: {BarraNew, BarraBase},
  data() {
    return {
      title: '',
      body: null,
      selectedMagazine: '',  //ID magazine seleccionada
      magazines: [],
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',  // URL de la API
    };
  },
  mounted() {
    this.fetchMagazines();
  },
  methods: {
    async fetchMagazines() {
      const response = await axios.get(`${this.api}/magazines/threads/`);
      this.magazines = response.data;
      console.log(this.magazines)
    },
    async submitForm() {
      const userToken = localStorage.getItem('authToken');
      await axios.post(`${this.api}/threads/`,
          {
            "title": this.title,
            "body": this.body,
            "magazine": this.selectedMagazine
          },
          {
            headers: {
              Authorization: `${userToken}`
            }
          })
      this.$router.push('/');
    }
  }
};
</script>

