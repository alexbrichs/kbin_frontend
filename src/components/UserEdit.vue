<template>
  <body class="theme--light" data-controller="kbin notifications" data-turbo="false">
  <header id="header" class="header">
    <div class="kbin-container">
      <nav class="head-nav">
        <div class="brand">
          <a href="/"><img id="logo" src="/assets/svg/kbin_logo.svg" alt="Homepage" title="Homepage"></a>
        </div>
        <menu class="head-nav__menu">
          <li></li>
          <li><a href="/" :class="{ active: actiu === 'threads' }">Threads</a></li>
          <li><a href="/magazines" :class="{ active: actiu === 'magazines' }">Magazines</a></li>
        </menu>
      </nav>
      <menu>
        <li>
          <a href="/cercador" class="icon" aria-label="Search" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i> Search
          </a>
        </li>

        <li class="dropdown"><a href="/new/link" class="icon" aria-label="Add" title="Add"><i
            class="fa-solid fa-plus"></i> Add</a>
          <ul class="dropdown__menu">
            <li><a href="/new/link" class="">Add new link</a></li>
            <li><a href="/new/thread" class="">Add new thread</a></li>
            <li><a class="" href="/newMagazine">Create new magazine</a></li>
          </ul>
        </li>
        <li v-if="estaLoguejat" class="dropdown">
          <a class="login" :href="`/u/${this.selectedUser}`">
            <span class="user-name">{{ this.selectedUser }}</span>
          </a>
          <ul class="dropdown__menu">
            <li><a :href="`/u/${this.selectedUser}`" class="">Profile</a></li>
            <li><a :href="`/kbin/settings/profile/${this.selectedUser}`" class="">Settings</a></li>
            <li><a href='#' @click.prevent="logout">Sign off</a></li>

          </ul>
        </li>
      </menu>
    </div>
  </header>
  <slot></slot>
  <div id="middle" class="page-user page-user-overview">
    <div class="kbin-container">
      <main id="main" data-controller="lightbox timeago" class="">
        <div class="section">
          <div class="user-box">
            <div v-if="user.cover && user.avatar" class="with-cover with-avatar">
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover"
                   :alt="`@${user.username}@kbin.social`">
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
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover"
                   :alt="`@${user.username}@kbin.social`">
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
              <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover"
                   :alt="`@${user.username}@kbin.social`">
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
                <img v-if="user.cover" height="200" width="100%" class="cover" :src="user.cover"
                     :alt="`@${user.username}@kbin.social`">
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
        <div id="content" class="section">
          <div class="container">
            <h1 hidden>Profile</h1>
            <form @submit.prevent="submitForm" name="edit-user" method="post" enctype="multipart/form-data">
              <div>
                  <textarea
                      id="user_basic_about"
                      name="description"
                      placeholder="About"
                      v-model="description"
                      @input="updateDisplay"
                      maxlength="512"
                      :class="{ 'rich-textarea': true, 'autogrow': true }"></textarea>
              </div>
              <div>
                <label for="user_basic_username">Username</label>
                <div id="user_basic_username" name="username"
                     style="-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid #ccc; padding: 2px 8px;">
                  {{ user.username }}
                </div>
              </div>
              <div><label for="user_basic_avatar">Avatar</label><input @change="handleAvatarUpload" type="file" id="user_basic_avatar"
                                                                       name="avatar"></div>
              <div><label for="user_basic_cover">Front page</label><input @change="handleCoverUpload" type="file" id="user_basic_cover"
                                                                          name="cover"></div>
              <div class="row actions">
                <div>
                  <button type="submit" id="user_basic_submit" name="user_basic[submit]"
                          class="btn btn__primary">Keep
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: 'UserEdit',
  props: ['username'],
  data() {
    return {
      user: {},
      actiu: '',
      description: '',
      cover: '',
      avatar: '',
      selectedUser: localStorage.getItem('selectedUser'),
    };
  },
  mounted() {
    this.fetchUser();
  },
  computed: {
    estaLoguejat() {
      return localStorage.getItem('authToken') !== null;
    }
  },
  methods: {
    async fetchUser() {
      try {
        const apiKey = localStorage.getItem('authToken');
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/u/${this.username}/`, {
          headers: {
            'Authorization': `${apiKey}`
          }
        });
        this.user = response.data;
        this.description = this.user.description
        this.cover = this.user.cover
        this.avatar = this.user.avatar
        console.log(this.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async submitForm() {
      const userToken = localStorage.getItem('authToken');
      await axios.put(`https://bravo13-36a68ba47d34.herokuapp.com/api/settings/${this.username}/`,
          {
            "description": this.description,
            "cover": this.cover,
            "avatar": this.avatar,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `${userToken}`
            }
          })
          .then(response => {
            console.log(response);
            // Actualitzar la pàgina
            this.user.description = this.description
            this.user.avatar = this.avatar
            this.user.cover = this.cover
          })
          .catch(error => {
            console.error(error);
          });
      this.$router.push(`/u/${this.user.username}`)
    },
    handleAvatarUpload(event) {
      // Capturar la imagen seleccionada y asignarla a la propiedad image
      this.avatar = event.target.files[0];
    },
    handleCoverUpload(event) {
      // Capturar la imagen seleccionada y asignarla a la propiedad image
      this.cover = event.target.files[0];
    },
  }
}
</script>
