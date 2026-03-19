<script lang="ts">
import {defineComponent} from 'vue'
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import NavHeader from "@/public/components/nav-header.component.vue";
import TemplateTable from "@/shared/components/template-table.component.vue";
import {FilterMatchMode, FilterOperator} from "@primevue/core/api";
import { UsersService } from '@/shared/services/users-api.service';
import { IssueReportService } from '@/shared/services/report-api.service';
import { IssueReportAssembler } from '@/shared/services/report-assembler';

export default defineComponent({
  name: "history-it-page",
  components: {TemplateTable, TitleSubtitle, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.dashboard'), route:"/dashboard"}, {label:this.$t('nav.assignedIssues'), route:"/issues/assigned"},{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.recurrentIssues'), route:"/recurrent"}],
      info: {title: this.$t('statistics.myIssues.it.info.title'), sub: this.$t('statistics.myIssues.it.info.sub')},
      filters:{
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        assignee: { value: [], matchMode: FilterMatchMode.IN },
        reporter: { value: [], matchMode: FilterMatchMode.IN },
        screen: { value: [], matchMode: FilterMatchMode.IN },
        submittedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        resolvedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS  }] },
        severity: { value: [], matchMode: FilterMatchMode.IN },
      },
      fields:[
        { key: "title", title: this.$t('statistics.fields.title'), type: "text" },
        { key: "assignee", title: this.$t('statistics.fields.assignedTo'), type: "select"},
        { key: "reporter", title: this.$t('statistics.fields.reporter'), type: "select" },
        { key: "severity", title: this.$t('statistics.fields.severity'), type: "tag"},
        { key: "screen", title: this.$t('statistics.fields.location'), type: "select" },
        { key: "submittedAt", title: this.$t('statistics.fields.submittedAt'), type: "date" },
        { key: "resolvedAt", title: this.$t('statistics.fields.resolvedAt'), type: "date" }
      ],
      issues:[],

      reportAssembler: new IssueReportAssembler(),
      usersService: new UsersService(),
      reportService: new IssueReportService()
    }
  },
  mounted() {
    this.usersService.getITMembersByCompanyId().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "assignee");
      if (assignedToField) {
        assignedToField.options = res.data.map((u: any) => ({
          name: u.name,
          img_url: u.img_url}));
      }
    });
    this.usersService.getEmployeesByCompanyId().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "reporter");
      if (assignedToField) {
        assignedToField.options = res.data.map((u: any) => ({
          name: u.name,
          img_url: u.img_url}));
      }
    });
    this.reportService.getSeverityOptions().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "severity");
      if (assignedToField) {
        assignedToField.options = res.data.map((opt: any) => ({
          label: this.$t('status.' + opt),
          value: opt,
        }));
      }
    });
    this.reportService.getScreenLocationByName().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "screen");
      if (assignedToField) {
        assignedToField.options = res.data.map((opt: any) => ({
          label: opt,
          value: opt
        }));
      }
    });
    this.reportService.getIssuesByCompanyId().then((res) => {
      this.issues= this.reportAssembler.EntitiesFromResponse(res.data)
      console.log(this.issues)
    })
  }
})
</script>

<template>
  <nav-header :items="items"></nav-header>
  <title-subtitle :info = info></title-subtitle>
  <div style="display: flex; justify-content: center">
    <div style="width: 97%">
      <template-table
          :filters="filters"
          :fields="fields"
          :issues="issues"
      ></template-table>
    </div>
  </div>
</template>

<style scoped>

</style>