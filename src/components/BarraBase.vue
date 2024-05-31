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
        <li>
          <select v-model="selectedUser" id="magazine_select"
                  style="width: 100%; border-style: solid; height: 35px" required>
            <option value="NoUser">Usuari no loguejat</option>
            <option value="joan.marinoso">joan.marinoso</option>
            <option value="marc.exposito.francisco">marc.exposito.francisco</option>
            <option value="alex.brichs">alex.brichs</option>
            <option value="daniel.canizares">daniel.canizares</option>
          </select>

        </li>
      </menu>
    </div>
  </header>
  </body>
  <slot></slot>
</template>

<script>
import axios from "axios";
export default {
  name: 'BarraBase',
  data() {
    return {
      selectedUser: localStorage.getItem('selectedUser') || 'NoUser',
      actiu: 'threads',
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
    };
  },
  mounted() {

    this.updateDocument();
  },
  watch: {
    // Observar cambios en la ruta y actualizar el título del documento
    '$route': 'updateDocument',
    selectedUser(newVal, oldVal) {
      console.log(newVal)
      if (newVal !== oldVal) {
        localStorage.setItem('selectedUser', this.selectedUser);
        if (newVal === 'joan.marinoso') {
          localStorage.setItem('authToken', 'c8ed0dc656349028d96091bb5486c7ba6477c2b8');
        } else if (newVal === 'marc.exposito.francisco') {
          localStorage.setItem('authToken', 'adee491d50756e2affe3a22a18cbe7dfaba3fdf7');
        } else if (newVal === 'alex.brichs') {
          localStorage.setItem('authToken', '6a81be88dca26c52e563badfe91daeeea33d4071');
        } else if (newVal === 'daniel.canizares') {
          localStorage.setItem('authToken', 'ce609538fde4b41f7af13dcbe8e2a865e4dbed1f')
        } else {
          localStorage.removeItem('authToken')
        }
        window.location.reload();
      }
    }
  },
  computed: {
    estaLoguejat() {
      return localStorage.getItem('authToken') !== null;
    }
  },
  methods: {
    async updateDocument() {
      // Titol document segons ruta actual
      if (this.$route && this.$route.path) {
        if (this.$route.path === '/' || this.$route.path.startsWith('/top') || this.$route.path.startsWith('/newest')
            || this.$route.path.startsWith('/commented')) {
          document.title = 'kbin.social - Explore the Fediverse';
          this.$emit('update:actiu', 'threads');
        } else if (this.$route.path.startsWith('/cercador')) {
          document.title = 'Search kbin.social';
          this.$emit('update:actiu', '');
        } else if (this.$route.path.startsWith('/new/thread')) {
          document.title = 'Add new thread - kbin.social';
          this.$emit('update:actiu', '');
        } else if (this.$route.path.startsWith('/new/link')) {
          document.title = 'Add new link   - kbin.social';
          this.$emit('update:actiu', '');
        } else if (this.$route.path.startsWith('/magazines')) {
          this.actiu = 'magazines'
          document.title = 'Magazines   - kbin.social';
        } else if (this.$route.path.startsWith('/u/')) {
          const {username} = this.$route.params;
          this.actiu = ''
          document.title = `Overview - ${username}   - kbin.social`;
        } else if (this.$route.path.startsWith('/newMagazine')) {
          document.title = `Create new magazine - kbin.social`;
        } else if (this.$route.path.startsWith('/magazine/')) {
          const {id} = this.$route.params;
          const response = await axios.get(`${this.api}/magazine/${id}/`);
          document.title = `${response.data.name} - kbin.social`;
        }

      }
    },
    logout() {
      localStorage.removeItem('selectedUser', '');
      localStorage.removeItem('authToken')
      window.location.reload();
    }
  }
}
</script>

