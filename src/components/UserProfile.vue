<template>
  <body class="theme--light" data-controller="kbin notifications" data-turbo="false">
  <BarraBase v-model:actiu="actiu">
  <div id="middle" class="page-user page-user-overview">
    <div class="kbin-container">
      <main id="main" data-controller="lightbox timeago" class="">
        <div class="section">
          <div class="user-box">
            <div v-if="user.cover && user.avatar" class="with-cover with-avatar">
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover" :alt="`@${user.username}@kbin.social`">
              <div class="user-main" id="content">
                <div>
                  <div class="row">
                    <figure>
                      <img v-if="user.avatar" width="100" height="100" style="max-width: 100px; max-height: 100px;"
                           :src="user.avatar" :alt="`@${user.username}@kbin.social`">
                    </figure>
                    <h1>{{ user.username }}</h1>
                    <small>@{{ user.username }}@kbin.social</small>
                    <small v-if="user.token !== null">{{ user.token }}</small>
                  </div>
                </div>
              </div>
              <div v-if="user.description" class="about">
                <div class="content">
                  <p>{{ user.description }}</p>
                </div>
              </div>
            </div>
            <div v-else-if="user.cover !== ''" class="with-cover">
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover" :alt="`@${user.username}@kbin.social`">
              <div class="user-main" id="content">
                <div>
                  <div class="row">
                    <figure>
                      <img v-if="user.avatar" width="100" height="100" style="max-width: 100px; max-height: 100px;"
                           :src="user.avatar" :alt="`@${user.username}@kbin.social`">
                    </figure>
                    <h1>{{ user.username }}</h1>
                    <small>@{{ user.username }}@kbin.social</small>
                    <small v-if="user.token !== null">{{ user.token }}</small>
                  </div>
                </div>
              </div>
              <div v-if="user.description" class="about">
                <div class="content">
                  <p>{{ user.description }}</p>
                </div>
              </div>
            </div>
            <div v-else-if="user.avatar" class="with-avatar">
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover" :alt="`@${user.username}@kbin.social`">
              <div class="user-main" id="content">
                <div>
                  <div class="row">
                    <figure>
                      <img v-if="user.avatar" width="100" height="100" style="max-width: 100px; max-height: 100px;"
                           :src="user.avatar" :alt="`@${user.username}@kbin.social`">
                    </figure>
                    <h1>{{ user.username }}</h1>
                    <small>@{{ user.username }}@kbin.social</small>
                    <small v-if="user.token !== null">{{ user.token }}</small>
                  </div>
                </div>
              </div>
              <div v-if="user.description" class="about">
                <div class="content">
                  <p>{{ user.description }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="">
                <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover" :alt="`@${user.username}@kbin.social`">
                <div class="user-main" id="content">
                  <div>
                    <div class="row">
                      <figure>
                      <img v-if="user.avatar" width="100" height="100" style="max-width: 100px; max-height: 100px;"
                           :src="user.avatar" :alt="`@${user.username}@kbin.social`">
                      </figure>
                      <h1>{{ user.username }}</h1>
                      <small>@{{ user.username }}@kbin.social</small>
                      <small>{{ user.token }}</small>
                      <small v-if="user.token !== null">{{ user.token }}</small>
                    </div>
                  </div>
                </div>
                <div v-if="user.description" class="about">
                <div class="content">
                  <p>{{ user.description }}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="options" id="options">
          <div></div>
          <menu class="options__main" style="align-items: center; justify-content: center;">
            <li>
              <a :class="{ 'active': selected === 'threads' }" :href="`/u/${user.username}`">
                <span style="vertical-align: inherit;">threads ({{ user.total_threads }})</span>
              </a>
            </li>
            <li>
              <a :class="{ 'active': selected === 'comments' }" :href="`/u/${user.username}/comments`">
                <span style="vertical-align: inherit;">comments ({{ user.total_comments }})</span>
              </a>
            </li>
            <li v-if="user.token !== null">
              <a :class="{ 'active': selected === 'boosts' }" :href="`/u/${user.username}/boosts`">
                <span style="vertical-align: inherit;">boosts ({{ user.total_boosts }})</span>
              </a>
            </li>
          </menu>
        </aside>

        <aside v-if="selected !== 'comments'" class="options options--top" id="options"
               style="align-items: center; justify-content: center;">
          <div></div>
          <menu class="options__main no-scroll">
            <li>
              <a :class="{ 'active': active_option === 'top' }" :href="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}top/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> top </font></font>
              </a>
            </li>
            <li>
              <a :class="{ 'active': active_option === 'newest' }" :href="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}newest/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> newest </font></font>
              </a>
            </li>
            <li>
              <a :class="{ 'active': active_option === 'commented' }" :href="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}commented/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> commented </font></font>
              </a>
            </li>
          </menu>
          <menu class="options__filters">
            <li class="dropdown">
              <button aria-label="Filtrar per tipus" title="Filtrar per tipus"><i class="fa-solid fa-filter"></i> Filter
                by type
              </button>
              <ul class="dropdown__menu">
                <li><a :class="{ 'active': active_filter === 'tot' }" :href="`/u/${user.username}/${active_option}/tot`" >Tot</a></li>
                <li><a :class="{ 'active': active_filter === 'links' }" :href="`/u/${user.username}/${active_option}/links`" >Links</a></li>
                <li><a :class="{ 'active': active_filter === 'threads' }" :href="`/u/${user.username}/${active_option}/threads`" >Threads</a></li>
              </ul>
            </li>
          </menu>
        </aside>

        <aside v-else class="options options--top" id="options" style="align-items: center; justify-content: center;">
          <div></div>
          <menu class="options__main no-scroll">
            <li>
              <a :class="{ 'active': active_option === 'top' }" :href="`/u/${user.username}/comments/top/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> top </font></font>
              </a>
            </li>
            <li>
              <a :class="{ 'active': active_option === 'newest' }" :href="`/u/${user.username}/comments/newest/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> newest </font></font>
              </a>
            </li>
            <li>
              <a :class="{ 'active': active_option === 'oldest' }" :href="`/u/${user.username}/comments/oldest/${active_filter}`">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> commented </font></font>
              </a>
            </li>
          </menu>
          <menu class="options__filters">
            <li class="dropdown">
              <button aria-label="Filtrar per tipus" title="Filtrar per tipus"><i class="fa-solid fa-filter"></i> Filter
                by type
              </button>
              <ul class="dropdown__menu">
                <li><a :class="{ 'active': active_filter === 'tot' }" :href="`/u/${user.username}/comments/${active_option}/tot`" >Tot</a></li>
                <li><a :class="{ 'active': active_filter === 'links' }" :href="`/u/${user.username}/comments/${active_option}/links`" >Links</a></li>
                <li><a :class="{ 'active': active_filter === 'threads' }" :href="`/u/${user.username}/comments/${active_option}/threads`" >Threads</a></li>
              </ul>
            </li>
          </menu>
        </aside>

        <div id="content" class="overview subjects comments-tree comments show-comment-avatar show-post-avatar">
          <template v-if="selected !== 'comments'">
            <div>
              <ShowThreads v-for="thread in data" :key="thread.id" :thread="thread"/>
            </div>
          </template>
          <template v-else>
            <div>
              <ShowComments v-for="comment in data" :key="comment.id" :comment="comment"/>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
  </BarraBase>
  </body>
</template>

<script>
import axios from "axios";
import BarraBase from "@/components/BarraBase.vue";
import ShowThreads from '@/components/ShowThreads.vue';
import ShowComments from '@/components/ShowComments.vue'
export default {
  name: 'UserProfile',
  components: {
    BarraBase,
    ShowThreads,
    ShowComments,
  },
  props: ['username', 'activeSelected', 'activeOption', 'activeFilter'],
  data() {
    return {
      user: {},
      data: {},
      actiu: '',
      selected: this.activeSelected || 'threads', // Valor por defecto
      active_filter: 'tot', // Valor por defecto
      active_option: 'newest' // Valor por defecto
    };
  },
  mounted() {
    const {activeFilter, activeOption} = this.$route.params;

    // console.log(activeFilter);
    // console.log(activeOption);
    if (activeFilter) {
      this.active_filter = activeFilter;
    }
    if (activeOption) {
      this.active_option = activeOption;
    }
    // console.log(this.active_filter);
    // console.log(this.active_option);
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        // const apiKey = await this.getKey();
        const apiKey = localStorage.getItem('authToken');
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/u/${this.username}/${this.selected}/${this.active_option}/${this.active_filter}/`, {
          headers: {
            'Authorization': `${apiKey}`
          }
        });
        this.user = response.data.user;
        this.data = response.data.data
        console.log(this.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    /*
    async getKey() {
      try {
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/users/`);
        const user = response.data.find(user => user.username === this.username);
        return user ? user.token : null;
      } catch (error) {
        console.error('Error fetching API key:', error);
        return null; // Retorna null en caso de error
      }
    }
    */
  }
}
</script>