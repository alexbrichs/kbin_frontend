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
          <li> <a href="/" :class="{ active: actiu === 'threads' }">Threads</a></li>
          <li><a href="/magazines" :class="{ active: actiu === 'magazines' }">Magazines</a></li>
        </menu>
      </nav>
      <menu>
        <li>
          <a href="/cercador" class="icon" aria-label="Search" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i> Search
          </a>
        </li>

        <li class="dropdown"><a href="/new" class="icon" aria-label="Add" title="Add"><i
            class="fa-solid fa-plus"></i> Add</a>
          <ul class="dropdown__menu">
            <li><a href="/new" class="">Add new link</a></li>
            <li><a href="/new/thread" class="">Add new thread</a></li>
            <li><a class="" href="/newMagazine">Create new magazine</a></li>
          </ul>
        </li>

        <li v-if="estaLoguejat" class="dropdown">
          <a class="login" href="/u/default_username">
            <span class="user-name">default_username</span>
          </a>
          <ul class="dropdown__menu">
            <li><a href="/u/default_username" class="">Profile</a></li>
            <li><a href="/kbin/settings/profile/default_username" class="">Settings</a></li>
            <li><a href="/logout">Sign off</a></li>
          </ul>
        </li>
        <a v-else class="login" href="https://bravo13-36a68ba47d34.herokuapp.com/accounts/google/login">Log in</a>
      </menu>
    </div>
  </header>
  </body>
  <slot></slot>
</template>

<script>
export default {
  name: 'BarraBase',
  mounted() {
    this.updateDocument();
  },
  watch: {
    // Observar cambios en la ruta y actualizar el título del documento
    '$route': 'updateDocument'
  },
  props: {
    actiu:String
  },
  computed: {
    estaLoguejat() {
      return localStorage.getItem('authToken') !== null;
    }
  },
  methods: {
    updateDocument() {
      localStorage.setItem('authToken', "c8ed0dc656349028d96091bb5486c7ba6477c2b8");
      // Lógica condicional para establecer el título del documento según la ruta actual
      if (this.$route && this.$route.path) {
        if (this.$route.path === '/') {
          document.title = 'kbin.social - Explore the Fediverse';
          this.$emit('update:actiu', 'threads');
        }
      }
    }
  }
}
</script>

