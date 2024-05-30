<template>
  <BarraBase v-model:actiu="actiu">
    <div id="middle" class="page-magazines page-settings">
      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="view-compact">
          <div id="content">
            <div class="section">
              <div class="magazines table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th style="text-align: center">Name</th>
                      <th style="text-align: center">
                        <a rel="nofollow noopener noreferrer" href='/magazines/threads/'>Threads</a>
                      </th>
                      <th style="text-align: center">
                        <a rel="nofollow noopener noreferrer" href="/magazines/commented/">Comments</a>
                      </th>
                      <th style="text-align: center">
                        <a rel="nofollow noopener noreferrer" href="/magazines/elements/">Publications</a>
                      </th>
                      <th style="text-align: center">
                        <a rel="nofollow noopener noreferrer" href="/magazines/suscriptions/">Subscriptions</a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="magazine in magazines" :key="magazine.id">
                      <td><a rel="nofollow noopener noreferrer" :href="`/magazine/${magazine.id}/top/tot/`" >{{ magazine.name }}</a></td>
                      <td style="text-align: center">{{ magazine.total_threads }}</td>
                      <td style="text-align: center">{{ magazine.total_comments }}</td>
                      <td style="text-align: center">{{ magazine.total_publicacions }}</td>
                       <td>
                        <aside class="magazine__subscribe" data-controller="subs">
                          <div class="action">
                            <i class="fa-solid fa-users"></i>
                            <span>{{ magazine.n_suscriptions }}</span>
                          </div>
                          <form @submit.prevent="handleSubscription(magazine.id)">
                            <button
                              type="submit"
                              class="btn btn__secondary action"
                              data-action="subs#send"
                            >
                              <i class="fa-sharp fa-solid" :class="isSubscribed(magazine.id) ? 'fa-folder-minus' : 'fa-folder-plus'"></i>
                              <span>{{ isSubscribed(magazine.id) ? 'Unsubscribe' : 'Subscribe' }}</span>
                            </button>
                          </form>
                        </aside>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </BarraBase>
</template>
<script>
import BarraBase from "@/components/BarraBase.vue";
import axios from "axios";
export default {
  name: 'LlistarMagazines',
  components: {BarraBase},
  data() {
    return {
       activeOption: 'threads',
      magazines:[],
      userSubscriptions:[],
    }
  },
  mounted() {
    const {activeOption} = this.$route.params;
    if (activeOption) {
      this.activeOption = activeOption;
    }
    this.fetchMagazines();
    this.fetchUserSubscriptions();
  },
  methods: {
    async fetchMagazines() {
      try {
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/magazines/${this.activeOption}/`);
        this.magazines = response.data;
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
      console.log(this.magazines);
    },
    async fetchUserSubscriptions() {
      try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        console.log(userToken)
        if (!userToken) {
          throw new Error('No se encontró el token del usuario en el localStorage');
        }
        const response = await axios.get(
            'https://bravo13-36a68ba47d34.herokuapp.com/api/user_subscriptions/',
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        );
        console.log('Suscripcions obtingudes correctament:', response.data);
        this.userSubscriptions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    isSubscribed(magazineId) {
      return this.userSubscriptions.some(sub => sub.magazine === magazineId);
    },
    async handleSubscription(magazineId) {
      console.log(`Handle subscription for magazine ID: ${magazineId}`);
      if (this.isSubscribed(magazineId)) {
        console.log('Unsubscribing...');
        await this.unsubscribeUrl(magazineId);
      } else {
        console.log('Subscribing...');
        await this.subscribeUrl(magazineId);
      }
      this.fetchUserSubscriptions(); // Refresh the subscriptions after the change
    },
    async subscribeUrl(id) {
      try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
          localStorage.setItem('NoLoguejat', 'true');
          this.$router.push('/')
          return;
        }
        const response = await axios.post(
            `https://bravo13-36a68ba47d34.herokuapp.com/api/suscriptions/${id}/`,
            {},
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        );
        console.log('Suscripcio enviada correctament:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error al enviar la suscripcio:', error);
      }
    },
   async unsubscribeUrl(id) {
     try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
          throw new Error('No se encontró el token del usuario en el localStorage');
        }
        const response = await axios.delete(
            `https://bravo13-36a68ba47d34.herokuapp.com/api/suscriptions/${id}/`,
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        );
        console.log('Suscripcio enviada correctament:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error al enviar la suscripcio:', error);
      }
    }
    },
}
</script>