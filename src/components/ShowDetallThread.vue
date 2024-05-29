<template>
  <BarraBase v-model:actiu="actiu">
    <template v-if="totcarregat">
    <div id="middle" class="page-entry-single">
      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="">
          <div id="content">
            <article :class="articleClass">
              <header>
                <h1>
                  <a rel="nofollow noopener noreferrer" :href="`/thread/${thread.id}/top/`">{{ thread.title }}</a>
                  <span class="entry__domain" v-if="thread.url">
          &nbsp;(<a :href="'//'+thread.url" target="_blank">{{ thread.url }}</a> )
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
                <time class="timeago" :datetime="thread.creation_date">
                  &nbsp;{{ tiempoDesdeCreacion(thread.creation_data) }}
                </time>
                <span> to </span>
                <a :href="`/magazine/${thread.magazine}`" class="magazine-inline"
                   title={{magazineName}}>{{ magazineName }}</a>
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
                      <p :style="{ color: boosted ? 'green' : 'inherit', fontWeight: boosted ? 'bold' : 'normal' }">
                        {{ thread.num_boosts > 0 ? 'boost (' + thread.num_boosts + ')' : 'boost' }}
                      </p>
                    </button>
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
            <div id="comment-add" class="section">
              <h3 hidden="">Añadir un comentario</h3>
              <form name="entry_comment" method="post" action=""
                    class="comment-add" enctype="multipart/form-data">
                <div><label for="entry_comment_6616cdb65f3850.74137319_body"></label><textarea
                    id="entry_comment_6616cdb65f3850.74137319_body" name="entry_comment[body]"
                    data-controller="input-length rich-textarea autogrow"
                    data-action="input-length#updateDisplay" data-input-length-max-value="5000"
                    style="overflow: hidden; height: 66px;"></textarea>
                </div>
                <div class="row actions">
                  <ul>
                    <li class="dropdown">
                      <div>
                        <button type="submit" id="entry_comment_6616cdb65f3850.74137319_submit"
                                name="entry_comment[submit]" class="btn btn__primary"
                                data-action="subject#sendForm">Add comment
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            <section id="comments" class="comments entry-comments comments-tree show-comment-avatar"
                     data-controller="subject-list comments-wrap"
                     data-action="notifications:EntryCommentCreatedNotification@window->subject-list#increaseCounter">
              <ShowComments v-for="comment in comments" :key="comment.id" :comment="comment"/>
            </section>
          </div>
        </main>
      </div>
    </div>
    </template>
  </BarraBase>
</template>

<script>
import axios from 'axios';
import BarraBase from "@/components/BarraBase.vue";
import ShowComments from "@/components/ShowComments.vue";

export default {
  name: 'ShowDetallThread',
  components: {ShowComments, BarraBase},
  props: ['id'],
  data() {
    return {
      magazineName: '',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      thread: {},
      postMeu: false,
      boosted: false,
      votat: false,
      eslike: false,
      comments: [],
      order: 'newest',
      upvotedColor: '#0f5132',
      downvotedColor: '#842029',
      totcarregat: false,
    }
  },
  mounted() {
    this.getComments();
  },
  async created() {
    try {
      const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/${this.id}/`);
      this.thread = response.data;
      await this.getMagazineName(this.thread.magazine);
      document.title = `${this.thread.title} - ${this.magazineName} - kbin.social`;
      this.postMeu = await this.espublicaciomeva();
      this.boosted = await this.esboosted();
      this.votat = await this.esvotat();
      this.totcarregat = true;
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
    async ImpulsarPublicacio(id) {
      const userToken = localStorage.getItem('authToken');
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
      this.$router.push('/');
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
    },
    async esboosted() {
      const userToken = localStorage.getItem('authToken');
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
    async esvotat() {
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
      let vots = response.data;
      for (let vot of vots) {
        if (vot.publicacio_id === this.thread.id) {
          this.eslike = vot.positiu;
          return true;
        }
      }
      return false;
    },
    async getComments() {
      try {
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/${this.id}/comments/top`);
        this.comments = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
  }
};
</script>

