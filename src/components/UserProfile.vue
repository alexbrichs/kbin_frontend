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
              <router-link :to="`/u/${user.username}`" :class="{ active: selected === 'threads' }">
                <span style="vertical-align: inherit;">threads ({{ user.total_threads }})</span>
              </router-link>
            </li>
            <li>
              <router-link :to="`/u/${user.username}/commented`" :class="{ active: selected === 'com' }">
                <span style="vertical-align: inherit;">comments ({{ user.total_comments }})</span>
              </router-link>
            </li>
            <li v-if="user.token !== null">
              <router-link :to="`/u/${user.username}/boosts`" :class="{ active: selected === 'boost' }">
                <span style="vertical-align: inherit;">boosts ({{ user.total_boosts }})</span>
              </router-link>
            </li>
          </menu>
        </aside>

        <aside v-if="selected !== 'com'" class="options options--top" id="options"
               style="align-items: center; justify-content: center;">
          <div></div>
          <menu class="options__main no-scroll">
            <li>
              <router-link :to="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}top/${active_filter}`"
                           :class="{ active: active_option === 'top' }">
                <font style="vertical-align: inherit;">top</font>
              </router-link>
            </li>
            <li>
              <router-link
                  :to="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}newest/${active_filter}`"
                  :class="{ active: active_option === 'newest' }">
                <font style="vertical-align: inherit;">newest</font>
              </router-link>
            </li>
            <li>
              <router-link :to="`/u/${user.username}/${selected !== 'threads' ? 'boosts/' : ''}com/${active_filter}`"
                           :class="{ active: active_option === 'com' }">
                <font style="vertical-align: inherit;">commented</font>
              </router-link>
            </li>
          </menu>
          <menu class="options__filters">
            <li class="dropdown">
              <button aria-label="Filtrar per tipus" title="Filtrar per tipus"><i class="fa-solid fa-filter"></i> Filter
                by type
              </button>
              <ul class="dropdown__menu">
                <li>
                  <router-link :to="`/u/${user.username}/${active_option}/tot`"
                               :class="{ active: active_filter === 'tot' }">
                    Tot
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/u/${user.username}/${active_option}/links`"
                               :class="{ active: active_filter === 'links' }">
                    Links
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/u/${user.username}/${active_option}/threads`"
                               :class="{ active: active_filter === 'threads' }">
                    Threads
                  </router-link>
                </li>
              </ul>
            </li>
          </menu>
        </aside>

        <aside v-else class="options options--top" id="options" style="align-items: center; justify-content: center;">
          <div></div>
          <menu class="options__main no-scroll">
            <li>
              <router-link :to="`/u/${user.username}/commented/top/${active_filter}`"
                           :class="{ active: active_option === 'top' }">
                <font style="vertical-align: inherit;">top</font>
              </router-link>
            </li>
            <li>
              <router-link :to="`/u/${user.username}/commented/newest/${active_filter}`"
                           :class="{ active: active_option === 'newest' }">
                <font style="vertical-align: inherit;">newest</font>
              </router-link>
            </li>
            <li>
              <router-link :to="`/u/${user.username}/commented/oldest/${active_filter}`"
                           :class="{ active: active_option === 'oldest' }">
                <font style="vertical-align: inherit;">oldest</font>
              </router-link>
            </li>
          </menu>
        </aside>

        <div id="content" class="overview subjects comments-tree comments show-comment-avatar show-post-avatar">
          <template v-if="selected !== 'com'">
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
  props: ['username'],
  data() {
    return {
      user: {},
      data: {},
      actiu: '',
      selected: 'threads',
      active_filter: 'tot',
      active_option: 'newest'
    };
  },
  mounted() {
    const {selected, activeFilter, activeOption} = this.$route.params;
    if (activeFilter) {
      this.active_filter = activeFilter;
    }
    if (activeOption) {
      this.active_option = activeOption;
    }
    if (selected) {
      this.selected = selected;
    }
    console.log(this.active_filter);
    console.log(this.active_option);
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