<template>
  <body class="theme--light" data-controller="kbin notifications" data-turbo="false">
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
                    <small v-if="user.email === user.email">{{ user.token }}</small>
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
                    <small v-if="user.email === user.email">{{ user.token }}</small>
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
                    <small v-if="user.email === user.email">{{ user.token }}</small>
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
                      <small v-if="user.email === user.email">{{ user.token }}</small>
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
      </main>
    </div>
  </div>
  </body>
</template>

<script>
import axios from "axios";
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    this.fetchMagazines();


  },
  methods: {
    async fetchMagazines() {
      try {
        const response = await axios.get('https://bravo13-36a68ba47d34.herokuapp.com/api/u/daniel.canizares/');
        this.user = response.data;
        console.log(this.user);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    },

  }
}
</script>