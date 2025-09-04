<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import TemplateTable from "@/statistics/components/template-table.component.vue";
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { UsersService } from "@/shared/services/users-api.service";
import { IssueReportService } from '@/shared/services/report-api.service';
import { IssueReportAssembler } from '@/shared/services/report-assembler';

export default defineComponent({
  name: "my-issues-employee",
  components: {TemplateTable, TitleSubtitle, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.report'), route:"/report"}, {label:this.$t('nav.myIssues'), route:"/issues/reported"}],
      info: {title: this.$t('statistics.myIssues.employee.info.title'), sub: this.$t('report.info.subtitle')},
      filters:{
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        assignee: { value: [], matchMode: FilterMatchMode.IN },
        submittedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        resolvedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS  }] },
        severity: { value: [], matchMode: FilterMatchMode.IN },
        status:{ value: [], matchMode: FilterMatchMode.IN }
      },
      fields:[
        { key: "title", title: this.$t('statistics.fields.title'), type: "text" },
        { key: "status", title: this.$t('statistics.fields.status'), type: "tag" },
        { key: "assignee", title: this.$t('statistics.fields.assignedTo'), type: "select"},
        { key: "severity", title: this.$t('statistics.fields.severity'), type: "tag"},
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
    this.reportService.getSeverityOptions().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "severity");
      if (assignedToField) {
        assignedToField.options = res.data.map((opt: any) => ({
          label: this.$t('status.' + opt),
          value: opt,
        }));
      }
    });
    this.reportService.getStatusOptions().then((res) => {
      const assignedToField = this.fields.find(f => f.key === "status");
      if (assignedToField) { //back gives me value for translating later
        assignedToField.options = res.data.map((opt: any) => ({
          label: this.$t('status.' + opt),
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