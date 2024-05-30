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
    <div v-if="detallat" class="entry__body">
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
      <a :href="`/magazine/${thread.magazine}`" class="magazine-inline" title={{magazineName}}>{{ magazineName }}</a>
    </aside>
    <aside class="vote">
      <button @click="enviarVot('like')" title="Vots positius" aria-label="Vots positius">
      <span :style="(votat && eslike) ? { color: upvotedColor } : {}" data-subject-target="favCounter">
        {{ thread.num_likes }}
      </span>
        <span>&nbsp;</span>
        <span :style="(votat && eslike) ? { color: upvotedColor } : {}"><i class="fa-solid fa-arrow-up"></i></span>
      </button>

      <button @click="enviarVot('dislike')" title="Vots negatius" aria-label="Vots negatius">
      <span :style="(votat && !eslike) ? { color: downvotedColor } : {}" data-subject-target="favCounter">
        {{ thread.num_dislikes }}
      </span>
        <span>&nbsp;</span>
        <span :style="(votat && !eslike) ? { color: downvotedColor } : {}"><i class="fa-solid fa-arrow-down"></i></span>
      </button>
    </aside>
    <footer>
      <menu>
        <li>
          <a class="stretched-link" :href="`/thread/${thread.id}/top/`"><span
              data-subject-target="commentsCounter">{{ thread.num_coments }}</span>
            comments </a>
        </li>
        <li>
          <button class="boost-link stretched-link" type="submit" data-action="subject#favourite"
                  @click="ImpulsarPublicacio(thread.id)">
          <span :style="{ color: boosted ? 'green' : 'inherit', fontWeight: boosted ? 'bold' : 'normal' }">
            {{ thread.num_boosts > 0 ? 'boost (' + thread.num_boosts + ')' : 'boost' }}
          </span>
          </button>


        </li>

        <template v-if="postMeu">
          <li>
            <form :action="`/editar/publicacio/${thread.id}/`" name="edit_thread" method="get">
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
    eliminat: Boolean,
    detallat: Boolean,
  },
  data() {
    return {
      magazineName: 'asdf',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      postMeu: false,
      boosted: false,
      upvotedColor: '#0f5132',
      downvotedColor: '#842029',
      votat: false,
      eslike: false,
      totcarregat: false,
    }
  },
  async created() {
    this.getMagazineName(this.thread.magazine);
    this.postMeu = await this.espublicaciomeva();
    this.boosted = await this.esboosted();
    this.votat = await this.esvotat();
    this.totcarregat = true;
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
    async ImpulsarPublicacio(id) {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) {
        localStorage.setItem('NoLoguejat', 'true');
        window.location.reload();
      }
      if (this.boosted) {
        await axios.delete(`${this.api}/publicacions/boost/${id}/`,
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        )
      } else {
        await axios.post(`${this.api}/publicacions/boost/${id}/`,
            {},
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        )
      }
      window.location.reload()
    },
    async enviarVot(tipus) {
      try {
        // Obtener el token del localStorage
        const userToken = localStorage.getItem('authToken');
        if (userToken === null) {
          localStorage.setItem('NoLoguejat', 'true');
          window.location.reload();
        }
        //MIRAR SI L'USUARI JA HA VOTAT
        let response = await axios.get(`${this.api}/vots/`,
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        )
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
      this.$router.push('/')
    },
    async espublicaciomeva() {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) return false;
      const response = await axios.get(
          `${this.api}/u/${this.thread.author}/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      const token_thread = response.data.token;
      return userToken === token_thread;
    },
    async esvotat() {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) {
        return false;
      }
      //MIRAR SI L'USUARI JA HA VOTAT
      let response = await axios.get(`${this.api}/vots/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      )
      let vots = response.data;
      for (let vot of vots) {
        if (vot.publicacio_id === this.thread.id) {
          this.eslike = vot.positiu;
          return true;
        }
      }
      return false;
    },
    async esboosted() {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) return false;
      const response = await axios.get(
          `${this.api}/boosts/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      let boosts = response.data
      for (const boost of boosts) {
        if (boost.publicacio_id === this.thread.id) {
          return true;
        }
      }
    },
  }
};
</script>