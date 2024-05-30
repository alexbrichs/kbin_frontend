<template>
  <BarraBase v-model:actiu="actiu">
    <div id="middle" class="page-entry-create page-entry-create-link">

      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="">
          <BarraNew actiu="magazine">
            <div v-if="magazineExisteix" class="alert alert__danger" role="alert">
            This Magazine already exists
          </div>
            <div id="content" class="section">
              <div class="container">
                <div>
                  <form @submit.prevent="submitForm">
                    <div>
                      <label for="name">Name:</label>
                      <input
                          type="text"
                          id="name"
                          v-model="formData.name"
                          required
                      />
                    </div>
                    <div>
                      <label for="title">Title:</label>
                      <input
                          type="text"
                          id="title"
                          v-model="formData.title"
                          required
                      />
                    </div>


                    <div>
                      <textarea
                          id="description"
                          v-model="formData.description"
                          placeholder="Description"
                          style="overflow: hidden; height: 70px;"
                      ></textarea>
                    </div>

                    <div>
                      <textarea
                          id="rules"
                          v-model="formData.rules"
                          placeholder="Rules"
                          style="overflow: hidden; height: 70px;"
                      ></textarea>
                    </div>
                    <div>
                      <label for="nsfw">NSFW:</label>
                      <input
                          type="checkbox"
                          id="nsfw"
                          v-model="formData.nsfw"
                      />
                    </div>
                    <div class="row actions">
                      <div class="float-end">
                        <button type="submit" id="magazine_submit" name="magazine[submit]" class="btn btn__primary">
                          Create new magazine
                        </button>
                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </BarraNew>
        </main>
      </div>
    </div>
  </BarraBase>
</template>

<script>



import axios from "axios";
import BarraBase from "@/components/BarraBase.vue";
import BarraNew from "@/components/BarraNew.vue";

export default {
  components: {BarraNew, BarraBase},
  data() {
    return {
       formData: {
        title: '',
        name: '',
        description: '',
        rules: '',
        nsfw: false
      },

      magazineExisteix: false
    };
  },
  mounted() {
    const userToken = localStorage.getItem('authToken');
      if (userToken === null) {
        localStorage.setItem('NoLoguejat', 'true');
        this.$router.push('/')
        return;
      }
  },
  methods: {
    async submitForm() {
      try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
          throw new Error('No se encontró el token del usuario en el localStorage');
        }

        // Preparar los datos para el envío
        const dataToSubmit = {
          title: this.formData.title,
          name: this.formData.name,
          description: this.formData.description || null,
          rules: this.formData.rules || null,
          nsfw: this.formData.nsfw,
        };

        // Realizar la solicitud POST
        const response = await axios.post(
          `https://bravo13-36a68ba47d34.herokuapp.com/api/magazines/`,
          dataToSubmit,
          {
            headers: {
             Authorization: `${userToken}`
            }
          }
        );
        console.log('Magazine creada correctament:', response.data);

      this.$router.push({ path: `/magazine/${response.data.id}/top/tot/`});
      } catch (error) {
        if(error.response.status === 409){
          this.magazineExisteix = true;
        }
        console.log(error.response.status)
        console.error('Error al crear la magazine:', error);

      }
    }
  }
};
</script>