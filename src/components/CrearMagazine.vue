<template>
  <BarraBase v-model:actiu="actiu">
    <div>
    <form @submit.prevent="submitForm">
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
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="formData.description"
        ></textarea>
      </div>
      <div>
        <label for="rules">Rules:</label>
        <textarea
          id="rules"
          v-model="formData.rules"
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
      <button type="submit">Submit</button>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
  </BarraBase>
</template>

<script>



import axios from "axios";
import BarraBase from "@/components/BarraBase.vue";

export default {
  components: {BarraBase},
  data() {
    return {
       formData: {
        title: '',
        name: '',
        description: '',
        rules: '',
        nsfw: false
      },
      responseMessage: ''
    };
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
        this.responseMessage = 'Magazine creada correctament';
        window.location.reload();
      } catch (error) {
        console.error('Error al crear la magazine:', error);
        this.responseMessage = 'Error al crear la magazine';
      }
    }
  }
};
</script>
