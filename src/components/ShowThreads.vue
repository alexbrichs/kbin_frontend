<template>
  <article :class="articleClass">
    <header>
      <h1>
        <a rel="nofollow noopener noreferrer" :href="`/thread/${thread.id}/top/`">{{ thread.title }}</a>
        <span class="entry__domain" v-if="thread.url">
          &nbsp;(<a :href="'//'+thread.url" target="_blank">{{ thread.url }}</a> )
        </span>
      </h1>
    </header>
    <aside class="meta entry__meta">
      <a class="user-inline" :href="`/u/${thread.author}`">{{ thread.author }}</a>
      <time class="timeago" :datetime="thread.creation_date">&nbsp;{{
          tiempoDesdeCreacion(thread.creation_data)
        }}
      </time>
      <span> to </span>
      <a :href="`/magazine/${thread.magazine}`" class="magazine-inline" title={{magazineName}}>{{ magazineName }}</a>
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
            <button class="boost-link stretched-link" type="submit" data-action="subject#favourite"
                    @click.prevent="EliminarPublicacio(thread.id)">
              delete
            </button>
          </li>
        </template>

      </menu>
      <div data-subject-target="container" class="js-container">
      </div>
    </footer>
  </article>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowThreads',
  props: {
    thread: Object,
    eliminat: Boolean
  },
  data() {
    return {
      magazineName: 'asdf',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      postMeu: false
    }
  },
  async created() {
    this.getMagazineName(this.thread.magazine);
    this.postMeu = await this.espublicaciomeva();
  },
  computed: {
    articleClass() {
      return {
        'entry section entry--single section --top': true,
        'subject own': this.postMeu
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
          throw new Error('El usuari no està loguejat');
        }
        //MIRAR SI L'USUARI JA HA VOTAT
        let response = await axios.get(`${this.api}/vots/`,
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        )
        console.log(response.status)
        let vots = response.data;
        let votat = false;
        let like = false;
        vots.forEach(vot => {
          if (vot.publicacio_id === this.thread.id) {
            votat = true;
            like = vot.positiu;
          }
        });

        if (tipus === 'like') {
          if (votat && like) {
            response = await axios.delete(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/votar/${this.thread.id}/${tipus}/`,
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                });
          } else {
            response = await axios.post(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/votar/${this.thread.id}/${tipus}/`,
                {},
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                }
            );
          }
        } else if (tipus === 'dislike') {
          if (votat && !like) {
            response = await axios.delete(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/votar/${this.thread.id}/${tipus}/`,
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                });
          } else {
            response = await axios.post(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/votar/${this.thread.id}/${tipus}/`,
                {},
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                }
            );
          }
        }
        window.location.reload();
      } catch (error) {
        console.error('Error al enviar el voto:', error);
      }
    },
    async EliminarPublicacio(id) {
      const userToken = localStorage.getItem('authToken');
      await axios.delete(
          `${this.api}/publicacions/${id}/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      localStorage.setItem('eliminat', 'true');
      window.location.reload();


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