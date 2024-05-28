<template>
  <BarraBase v-model:actiu="actiu">
    <div id="middle" class="page-entry-front">
      <div class="kbin-container">
        <main id="main" class="" data-controller="lightbox timeago">
          <aside id="options" class="options options--top">
            <menu class="options__main no-scroll">
              <li><a :class="{ 'active': activeOption === 'top' }" :href="'/top/' + activeFilter" @click="updateActiveOption('top')">Top</a></li>
              <li><a :class="{ 'active': activeOption === 'newest' }" :href="'/newest/' + activeFilter" @click="updateActiveOption('newest')">Newest</a></li>
              <li><a :class="{ 'active': activeOption === 'commented' }" :href="'/commented/' + activeFilter" @click="updateActiveOption('commented')">Commented</a></li>
            </menu>
            <menu class="options__filters">
              <li class="dropdown">
                <button aria-label="Filtrar per tipus" title="Filtrar per tipus">
                  <i class="fa-solid fa-filter"></i> Filter by type
                </button>
                <ul class="dropdown__menu">
                  <li><a :class="{ 'active': activeFilter === 'tot' }" :href="'/' + activeOption + '/tot'" @click="updateActiveFilter('tot')">Tot</a></li>
                  <li><a :class="{ 'active': activeFilter === 'links' }" :href="'/' + activeOption + '/links'" @click="updateActiveFilter('links')">Links</a></li>
                  <li><a :class="{ 'active': activeFilter === 'threads' }" :href="'/' + activeOption + '/threads'" @click="updateActiveFilter('threads')">Threads</a></li>
                </ul>
              </li>
            </menu>
          </aside>
          <div v-if="eliminat" class="alert alert__success" role="alert">
            The thread has been successfully deleted.
          </div>
          <div id="content">
            <ShowThreads v-for="thread in threads" :key="thread.id" :thread="thread"/>
          </div>
        </main>
      </div>
    </div>
  </BarraBase>
</template>

<script>
import BarraBase from '@/components/BarraBase.vue';
import ShowThreads from '@/components/ShowThreads.vue';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    ShowThreads,
    BarraBase,
  },
  data() {
    return {
      actiu: '',
      activeOption: 'newest',  // Valor inicial predeterminado
      activeFilter: 'tot',      // Valor inicial predeterminado
      threads:[],
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
    }
  },
  mounted() {
    const {activeFilter, activeOption} = this.$route.params;
    if (activeFilter) {
      this.activeFilter = activeFilter;
    }
    if (activeOption) {
      this.activeOption = activeOption;
    }
    this.fetchThreads();
  },
  methods: {
    async fetchThreads() {
      try {
        if (this.activeFilter === 'tot') {
          const response = await axios.get(`${this.api}/llistar/publicacions/${this.activeOption}/`);
          this.threads = response.data;
        }
        else if (this.activeFilter === 'links') {
          const response = await axios.get(`${this.api}/llistar/links/${this.activeOption}/`);
          this.threads = response.data;
        }
        else if (this.activeFilter === 'threads') {
          const response = await axios.get(`${this.api}/llistar/threads/${this.activeOption}/`);
          this.threads = response.data;
        }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    },

  }
}
</script>
