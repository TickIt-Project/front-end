<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import { IssueReportService } from '@/shared/services/report-api.service';
import DashboardIssueCard from "@/troubleshooting/components/dashboard-issue-card.component.vue";
import { IssueReportAssembler } from '@/shared/services/report-assembler';
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import { UsersService } from '@/shared/services/users-api.service';

export default defineComponent({
  name: "dashboard-page",
  components: {TitleSubtitle, DashboardIssueCard, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.dashboard'), route:"/dashboard"}, {label:this.$t('nav.assignedIssues'), route:"/issues/assigned"},{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.recurrentIssues'), route:"/recurrent"}],
      info: {title: this.$t('dashboard.info.title'), sub: ''},
      issues:[],
      currentUser:[],
      statusOpt:[],
      statusCount: {},
      reportAssembler: new IssueReportAssembler(),
      reportService: new IssueReportService(),
      userService: new UsersService()
    }
  },
  mounted(){
    this.reportService.getStatusOptions().then((res) => {
      this.statusOpt= res.data
      console.log(this.statusOpt)
    })

    this.userService.getCurrentUser().then((res) => {
      this.currentUser= res.data
      console.log("current user",this.currentUser)
    })

    this.reportService.getIssuesByCompanyId().then((res) => {
      this.issues = this.reportAssembler.EntitiesFromResponse(res.data)
      console.log("Issues en dashboard:", this.issues)


      this.statusCount = {}

      this.issues.forEach(issue => {
        const status = issue.status || 'unknown'
        if (!this.statusCount[status]) {
          this.statusCount[status] = 0
        }
        this.statusCount[status]++
      })

    })
  },
})
</script>

<template>

  <nav-header :items="items"></nav-header>
  <title-subtitle :info="info"></title-subtitle>
  <div style="display: flex">
    <div class="issueCardContainer">
      <div class="issueCard" v-for="issue in issues" :key="issue.id">
        <dashboard-issue-card :currentUser="currentUser" :issue="issue"></dashboard-issue-card>
      </div>
    </div>
    <pv-fieldset :legend="$t('dashboard.seeMore')" style="width: 100%; margin-right: 20px; height: fit-content; position: sticky; top: 0;">

      <div v-for="status in statusOpt" style="margin: 20px 0">
        <pv-tag severity="secondary"><strong>{{$t(`status.${status}`)}}:</strong>{{statusCount[status]}} </pv-tag>
      </div>

    </pv-fieldset>
  </div>
</template>

<style scoped>
.issueCard{
  max-width: 60lvh;
  min-width: 60lvh;

}

.issueCardContainer{
  min-width: 130lvh;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-left: 50px;
}
</style>