<template>
  <body class="theme--light" data-controller="kbin notifications" data-turbo="false">
    <div id="middle" class="page-user page-user-overview">
      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="">
          <div class="section">
            <div class="user-box">
              <div class="">
                <div class="user-main" id="content">
                  <div>
                    <div class="row">
                      <h1>{{ user.username }}</h1>
                      <small>@{{ user.username }}@kbin.social</small>
                      <small>{{ user.token }}</small>
                    </div>
                  </div>
                </div>

              <header id="header" class="header">
                <div class="kbin-container">
                  <p>Hola, {{ user.username }}</p>
                </div>
              </header>

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