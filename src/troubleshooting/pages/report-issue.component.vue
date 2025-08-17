<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import FullStepper from "@/troubleshooting/components/full-stepper.component.vue";

export default defineComponent({
  name: "report-issue",
  components: {FullStepper, TitleSubtitle, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.report'), route:"/report"}, {label:this.$t('nav.myIssues'), route:"/issues/reported"}],
      info: {title: this.$t('report.info.title'), sub: this.$t('report.info.subtitle')}
    }
  }
})
</script>

<template>
<nav-header :items = items></nav-header>
  <title-subtitle :info = info></title-subtitle>
  <full-stepper></full-stepper>
</template>

<style scoped>

</style>