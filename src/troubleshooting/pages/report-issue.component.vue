<script>
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import FullStepper from "@/troubleshooting/components/full-stepper.component.vue";
import { IssueReportService } from '@/shared/services/report-api.service';


export default defineComponent({
  name: "report-issue",
  components: {FullStepper, TitleSubtitle, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.report'), route:"/report"}, {label:this.$t('nav.myIssues'), route:"/issues/reported"}],
      info: {title: this.$t('report.info.title'), sub: this.$t('report.info.subtitle')},
      reportService: new IssueReportService(),
    }
  },
  methods:{
    async onFormSubmit(formData) {
      console.log(formData)

      try {
        const response = await this.reportService.postIssueReport(formData)
        console.log(response)

      } catch (error) {
        console.error('Issue report', error)
      }
    }
  }
})
</script>

<template>
<nav-header :items = items></nav-header>
  <title-subtitle :info = info></title-subtitle>
  <full-stepper style="margin-left: 2em" onFormSubmit="onFormSubmit"></full-stepper>
</template>

<style scoped>

</style>