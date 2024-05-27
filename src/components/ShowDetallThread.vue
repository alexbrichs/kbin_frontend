<template>
  <BarraBase v-model:actiu="actiu">
    <div id="middle" class="page-entry-single">
      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="">
          <div id="content">
            <article :class="articleClass">
              <header>
                <h1>
                  <a rel="nofollow noopener noreferrer" :href="`/kbin/thread/${thread.id}/top/`">{{ thread.title }}</a>
                  <span class="entry__domain" v-if="thread.url">
          &nbsp;(<a :href="thread.url" target="_blank">{{ thread.url }}</a> )
        </span>
                </h1>
              </header>
              <div class="entry__body">
                <div class="content formatted" style="">
                  <p>{{ thread.body }}</p>
                </div>
              </div>

              <aside class="meta entry__meta">
                <a class="user-inline" :href="`/u/${thread.author}`">{{ thread.author }}</a>
                <time class="timeago" :datetime="thread.creation_date">&nbsp;{{
                    tiempoDesdeCreacion(thread.creation_data)
                  }}
                </time>
                <span> to </span>
                <a :href="`/magazine/${thread.magazine}`" class="magazine-inline" title={{magazineName}}>{{
                    magazineName
                  }}</a>
              </aside>
              <aside class="vote">
                <button @click="enviarVot('like')" title="Vots positius" aria-label="Vots positius">
                  <span data-subject-target="favCounter">{{ thread.num_likes }}</span>
                  <span>&nbsp;</span>
                  <span><i class="fa-solid fa-arrow-up"></i></span>
                </button>

                <button @click="enviarVot('dislike')" title="Vots negatius" aria-label="Vots negatius">
                  <span data-subject-target="favCounter">{{ thread.num_dislikes }}</span>
                  <span>&nbsp;</span>
                  <span><i class="fa-solid fa-arrow-down"></i></span>
                </button>
              </aside>
              <footer>
                <menu>
                  <li>
                    <a class="stretched-link" href="/kbin/thread/8/top/"><span
                        data-subject-target="commentsCounter">{{ thread.num_coments }}</span>
                      comments </a>
                  </li>
                  <li>
                    <form action="/kbin/boost/8/" name="boost_thread" method="post">
                      <input type="hidden" name="next" value="/">
                      <input type="hidden" name="keyword" value="">
                      <button class="boost-link stretched-link" type="submit" data-action="subject#favourite">boost
                      </button>
                    </form>
                  </li>

                  <template v-if="postMeu">
                    <li>
                      <form :action="`/kbin/editar/thread/${thread.id}/`" name="edit_thread" method="get">
                        <button class="boost-link stretched-link" type="submit" data-action="subject#favourite">edit
                        </button>
                      </form>
                    </li>
                    <li>
                      <form :action="`/kbin/eliminar/${thread.id}/`" name="eliminar_publicacio" method="post">
                        <button class="boost-link stretched-link" type="submit" data-action="subject#favourite">delete
                        </button>
                      </form>
                    </li>
                  </template>


                </menu>
                <div data-subject-target="container" class="js-container">
                </div>
              </footer>
            </article>
          </div>
        </main>
      </div>
    </div>
  </BarraBase>
</template>

<script>
import axios from 'axios';
import BarraBase from "@/components/BarraBase.vue";

export default {
  name: 'ShowDetallThread',
  components: {BarraBase},
  props: ['id'],
  data() {
    return {
      magazineName: '',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      thread: {},
      postMeu: false
    }
  },
  async created() {
    try {
      const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/${this.id}/`);
      this.thread = response.data;
      await this.getMagazineName(this.thread.magazine);
      document.title = `${this.thread.title} - ${this.magazineName} - kbin.social`;
      this.postMeu = await this.espublicaciomeva();
    } catch (error) {
      console.error('Error al obtener los detalles del hilo:', error);
    }
  },
  computed: {
    articleClass() {
      return {
        'entry section entry--single section --top': true,
        'subject own': this.postMeu // Añadir la clase 'own' si es mi publicación
      };
    }
  },
  methods: {
    tiempoDesdeCreacion(creationDate) {
      const now = new Date();
      const diff = now - new Date(creationDate);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 365) {
        const years = Math.floor(days / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
      } else if (days > 30) {
        const months = Math.floor(days / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
      } else if (days > 7) {
        const weeks = Math.floor(days / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
      } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        return 'Now';
      }
    },
    async getMagazineName(magazineId) {
      try {
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/magazine/${magazineId}`);
        this.magazineName = response.data.name;
      } catch (error) {
        console.error('Error fetching magazine:', error);
      }
    },
    async enviarVot(tipus) {
      try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
          throw new Error('No se encontró el token del usuario en el localStorage');
        }

        const response = await axios.post(
            `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/votar/${this.thread.id}/${tipus}/`,
            {},
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        );
        console.log('Voto enviado correctamente:', response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error al enviar el voto:', error);
      }
    },
    async espublicaciomeva() {
      const userToken = localStorage.getItem('authToken');
      const response = await axios.get(
          `${this.api}/u/${this.thread.author}/threads/newest/threads/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      const token_thread = response.data.user.token;
      return userToken === token_thread;
    }
  }
};
</script>

