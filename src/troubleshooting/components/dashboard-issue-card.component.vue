<script lang="ts">
import {defineComponent} from 'vue'
import {Button as PvButton, Dialog as PvDialog, Tag as PvTag} from "primevue";
import { severityConfig, statusConfig } from '@/shared/services/severity-configurations';
import ReportIssueCard from "@/shared/components/report-issue-card.component.vue";

export default defineComponent({
  name: "dashboard-issue-card",
  components: {ReportIssueCard, PvDialog, PvButton, PvTag},
  props:{
    issue: {
      type: Object,
      required: true
    },
    currentUser: Object
  },
  data(){
    return{
      severityConfig,
      statusConfig,
      productDialogVisible : false
    }
  },
  emits: ['update:profile_image', 'field-changed','detake-issue', 'take-issue'],
  methods:{
    showIssue(){
      this.productDialogVisible = true;
    },
    onDetakeIssue(payload) {
      this.$emit('detake-issue', payload);
    },
    onTakeIssue(payload) {
      this.$emit('take-issue', payload);
    }
  }
})
</script>

<template>

  <pv-dialog v-model:visible="productDialogVisible" modal :showHeader=0 style=" width: 50rem; " :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closable=0>

    <report-issue-card @take-issue="onTakeIssue" @detake-issue="onDetakeIssue" :fullInformation="true" :border="false" :issue="issue" style="padding-right: 2rem" :currentUser="currentUser"></report-issue-card>
    <div style="display:flex; justify-content: center; width: 100%;">
      <pv-button label="Cancel" @click="productDialogVisible=false" variant="text" style="width: 8rem;"></pv-button>
    </div>
  </pv-dialog>

  <pv-card>
    <template #header>
      <div style="display: flex; align-items: center; margin: 10px 10px 0;">
        <pv-tag :severity="severityConfig[issue.severity]" :value="$t(`status.${issue.severity}`)"></pv-tag>
        <div style="display: flex; flex: 1"></div>
        <p v-if="issue.submittedAt">{{issue.submittedAt.toUTCString()}}</p>
      </div>
    </template>
    <template #title>
      {{ issue.title }}
    </template>
    <template #content>
      <i class="pi pi-map-marker"></i>
      {{ issue.screen }}
    </template>
    <template #footer>
      <div style="display: flex; align-items: center;">
        <pv-tag :severity="statusConfig[issue.status]" :value="$t(`status.${issue.status}`)"></pv-tag>
        <div style="display: flex; flex: 1"></div>
        <pv-button icon="pi pi-plus"  rounded class="mr-2" @click="showIssue()" :label="$t(`dashboard.seeMore`)" ></pv-button>
      </div>
    </template>
  </pv-card>


</template>

<style scoped>

</style>