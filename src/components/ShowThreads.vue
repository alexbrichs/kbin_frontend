<template>
  <article class="entry section subject">
    <header>
      <h1>
        <a rel="nofollow noopener noreferrer" :href="`/kbin/thread/${thread.id}/top/`">{{ thread.title }}</a>
        <span class="entry__domain" v-if="thread.url">
          &nbsp;(<a :href="thread.url" target="_blank">{{ thread.url }}</a> )
        </span>
      </h1>
    </header>
    <aside class="meta entry__meta">
      <a class="user-inline" :href="`/u/${thread.author}`">{{ thread.author }}</a>
      <time class="timeago" :datetime="thread.creation_date">&nbsp;{{ tiempoDesdeCreacion(thread.creation_data) }}</time>
      <span> to </span>
      <a :href="`/magazine/${thread.magazine}`" class="magazine-inline" title={{magazineName}}>{{ magazineName }}</a>
    </aside>
    <aside class="vote">
      <button @click="enviarVot('like')" title="Vots positius" aria-label="Vots positius">
        <span data-subject-target="favCounter">{{ thread.num_likes }}</span>
        <span><i class="fa-solid fa-arrow-up"></i></span>
      </button>

      <button @click="enviarVot('dislike')" title="Vots negatius" aria-label="Vots negatius">
        <span data-subject-target="favCounter">{{ thread.num_dislikes }}</span>
        <span><i class="fa-solid fa-arrow-down"></i></span>
      </button>
    </aside>
    <footer>
      <menu>
        <li>
          <a class="stretched-link" href="/kbin/thread/8/top/"><span data-subject-target="commentsCounter">{{thread.num_coments}}</span>
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
  },
  data() {
    return {
    magazineName:'asdf',
    api:'https://bravo13-36a68ba47d34.herokuapp.com/api'
      }
  },
  created() {
    // Hacer la solicitud para obtener el nombre de la revista
    this.getMagazineName(this.thread.magazine);
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
    }
  }
};
</script>

