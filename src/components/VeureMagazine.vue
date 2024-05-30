<template>
<BarraBase v-model:actiu="actiu">
  <template v-if="totcarregat">
<SectionMagazine :magazine="magazine" />
  </template>
</BarraBase>
</template>



<script>
import BarraBase from "@/components/BarraBase.vue";

import axios from "axios";
import SectionMagazine from "@/components/SectionMagazine.vue";

export default {
  name: 'LlistarMagazines',
  components: {BarraBase, SectionMagazine},
  data(){
    return {
      magazine: null,
      totcarregat: false,
      id: null
    }

  },
  async mounted(){
    const {id} = this.$route.params;
    if (id) {
      this.id = id;
    }
    console.log(this.id)
    await this.fetchMagazine(this.id);

    this.totcarregat = true;
  },
  methods: {
    async fetchMagazine() {
      try {
        const response = await axios.get(`https://bravo13-36a68ba47d34.herokuapp.com/api/magazine/${this.id}/`);
        this.magazine = response.data;
      } catch (error) {
        console.error('Error fetching magazine:', error);
      }
      console.log(this.magazine);
    }

    }
}
</script>