<script>
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import { IssueReportService } from '@/shared/services/report-api.service';
import DashboardIssueCard from "@/troubleshooting/components/dashboard-issue-card.component.vue";
import { IssueReportAssembler } from '@/shared/services/report-assembler';
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import { UsersService } from '@/shared/services/users-api.service';
import ReportIssueCard from "@/shared/components/report-issue-card.component.vue";

export default defineComponent({
  name: "dashboard-page",
  components: {ReportIssueCard, TitleSubtitle, DashboardIssueCard, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.dashboard'), route:"/dashboard"}, {label:this.$t('nav.assignedIssues'), route:"/issues/assigned"},{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.recurrentIssues'), route:"/recurrent"}],
      info: {title: this.$t('dashboard.info.title'), sub: ''},
      issues:[],
      currentUser:null,
      statusOpt:[],
      statusCount: {},
      reportAssembler: new IssueReportAssembler(),
      reportService: new IssueReportService(),
      userService: new UsersService()
    }
  },
  async mounted() {
    const [statusRes, userRes, issuesRes] = await Promise.all([
      this.reportService.getStatusOptions(),
      this.userService.getCurrentUser(),
      this.reportService.getIssuesByCompanyId()
    ]);

    this.statusOpt = statusRes.data;
    this.currentUser = userRes.data;
    this.issues = this.reportAssembler.EntitiesFromResponse(issuesRes.data);

    this.computeStatusCount();
  },
    methods:{
      async onTakeIssue({ issueId }){
        try {
          await this.reportService.takeIssue(issueId);

          const issue = this.issues.find(i => i.id === issueId);
          if (issue) {
            issue.assignee = this.currentUser
            issue.status = "in_progress"
          }
        } catch (e) {
          console.error(e);
        }

      },
      async onDetakeIssue({ issueId }){
        try {
          await this.reportService.detakeIssue(issueId,this.currentUser);

          const issue = this.issues.find(i => i.id === issueId);
          if (issue) {
            issue.assignee = null
            issue.status = "open"
          }

        } catch (e) {
          console.error(e);
        }
      },
      computeStatusCount() {
        this.statusCount = {};

        this.issues.forEach(issue => {
          const status = issue.status || 'unknown';
          this.statusCount[status] = (this.statusCount[status] || 0) + 1;
        });
      },
    },
})
</script>

<template>

  <nav-header :items="items"></nav-header>
  <title-subtitle :info="info"></title-subtitle>
  <div style="display: flex">
    <div class="issueCardContainer">
      <div class="issueCard" v-for="issue in issues" :key="issue.id">
        <dashboard-issue-card @take-issue="onTakeIssue" @detake-issue="onDetakeIssue" :currentUser="currentUser" :issue="issue"></dashboard-issue-card>
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