<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";

export default defineComponent({
  name: "recurrent-issues-pages",
  components: {NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.dashboard'), route:"/dashboard"}, {label:this.$t('nav.assignedIssues'), route:"/issues/assigned"},{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.recurrentIssues'), route:"/recurrent"}],
    }
  }
})
</script>

<template>

  <nav-header :items="items"></nav-header>

</template>

<style scoped>

</style>