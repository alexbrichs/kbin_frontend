<template>
  <BarraBase v-model:actiu="actiu">
    <div id="middle" class="page-magazines page-settings">
      <div class="kbin-container">
        <main id="main" data-controller="lightbox timeago" class="view-compact">
          <div id="content">
            <div class="section">
              <div class="magazines table-responsive">
                <table>
                  <thead>
                  <tr>
                    <th style="text-align: center">Name</th>
                    <th style="text-align: center">
                      <a rel="nofollow noopener noreferrer" href='/'>Threads</a>
                    </th>
                    <th style="text-align: center">
                      <a rel="nofollow noopener noreferrer" href="/">Comments</a>
                    </th>
                    <th style="text-align: center">
                      <a rel="nofollow noopener noreferrer" href="/">Publications</a>
                    </th>
                    <th style="text-align: center">
                      <a rel="nofollow noopener noreferrer" href="/">Subscriptions</a>
                    </th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </BarraBase>
</template>


<script>
import BarraBase from "@/components/BarraBase.vue";
import axios from "axios";

export default {
  name: 'LlistarMagazines',
  components: {BarraBase},
  data() {
    return {
      activeFilter: 'tot',
      magazines:[],
    }
  },
  mounted() {
    console.log("entrada");
    this.fetchMagazines();
    console.log(this.magazines);
    console.log("sortida");

  },
  methods: {
    async fetchMagazines() {
      try {
        const response = await axios.get('https://bravo13-36a68ba47d34.herokuapp.com/api/magazines/threads/');
        this.magazines = response.data;
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    },

  }
}
</script>