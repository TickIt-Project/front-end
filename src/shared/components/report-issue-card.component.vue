<script lang="ts">
import {defineComponent} from 'vue'
import { severityConfig, statusConfig } from '../services/severity-configurations';
import {Avatar as PvAvatar, Tag as PvTag, useToast} from "primevue";
import Toast from 'primevue/toast';
import { STATUS_OPTIONS } from '@/shared/mappers/status-options'


export default defineComponent({
  name: "report-issue-card",
  components: {PvTag, PvAvatar, Toast},
  emits: ['detake-issue', 'take-issue','change-status'],
  data(){
    return{
      severityConfig, statusConfig,
      isTakeIssueDisabled: false,
      isDeTakeIssueDisabled: false,
      selectedStatus: this.issue.status,
      statusOptions: STATUS_OPTIONS(this.$t)
    }
  },
  props: {
    border: Boolean,
    issue: Object,
    fullInformation: Boolean,
    currentUser: Object,
  },
  methods:{
    clickedTaken(){
      this.isTakeIssueDisabled = true;
      this.$toast.add({ severity: 'success', summary: this.$t(`card.toastIssueTake.takeIssue.issueTaken`), detail: this.$t(`card.toastIssueTake.takeIssue.issue`)+" "+this.issue.id+" "+this.$t(`card.toastIssueTake.takeIssue.issueTakenDesc`), life: 3000 });
      this.$emit('take-issue', {
        issueId: this.issue.id
      });
      },
    clickedDetake(){
      this.isDeTakeIssueDisabled = true;
      this.$toast.add({ severity: 'info', summary: this.$t(`card.toastIssueTake.detakeIssue.issuedeTaken`), detail: this.$t(`card.toastIssueTake.detakeIssue.issue`)+" "+this.issue.id+" "+this.$t(`card.toastIssueTake.detakeIssue.issuedeTakenDesc`), life: 3000 });
      this.$emit('detake-issue', {
        issueId: this.issue.id
      });
    },
    selectStatus() {
      if (this.selectedStatus === this.issue.status) return;

      this.$emit('change-status', {
        issueId: this.issue.id,
        status: this.selectedStatus
      });
    },
    statusLabel(status) {
      return this.$t(`status.${status}`);
    }},
  computed:{
    issueBelongUser() {
      return this.issue?.assignee?.id === this.currentUser?.id;
  },
    filteredStatusOptions() {
      if (!this.issue?.status) return this.statusOptions;

      return this.statusOptions.filter(status =>
          status !== 'open' || status === this.issue.status
      );
    }},
  watch: {
    'issue.status': {
      immediate: true,
      handler(newStatus) {
        this.selectedStatus = newStatus;
      }
    }
  }

})
</script>

<template>
  <Toast />
  <pv-card class="card"
           :class="{'no-border': border === false}">

    <template #header>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px">
        <h3 style="margin:0; max-width: 700px">{{ issue.title }}</h3>
        <pv-tag :severity="severityConfig[issue.severity]" :value="$t(`status.${issue.severity}`)" />
        <div style="display: flex; flex: 1"></div>
        <p v-if="issue.submittedAt">{{issue.submittedAt.toLocaleDateString()}}</p>
      </div>
    </template>
    <template #content>
      <div class="contentWithImage">
        <div>
          <div class="htmlDesc" v-html="issue.description"></div>
          <div class="extraInfoContainer">
            <div class="iconTextContainer">
              <i class="pi pi-map-marker"></i>
              <p>{{ issue.screen }}</p>
            </div>
            <div class="iconTextContainer">
              <i class="pi pi-user"></i>
              <p>{{ issue.companyRole }}</p>
            </div>
          </div>
        </div>
        <img style="" src="https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/golden-retriever.jpg" width="300" alt="image">
      </div>
    </template>
    <template #footer >
      <div style="display: flex; justify-content: space-evenly; padding-right: 8%">
        <div class="footerContainer" v-if="issue.assignee" >
          <h4>{{$t("card.assignedMember")}}</h4>
          <div style="display: flex; gap: 5px; align-items: center">
          <pv-avatar :image="issue.assignee.profile_image" shape="circle"></pv-avatar>
          <p>{{issue.assignee.name}}</p>
          </div>
        </div>
        <div class="footerContainer" v-if="issue.status">
          <h4>{{$t("card.status")}}</h4>
          <pv-tag :value="$t(`status.${issue.status}`)" :severity="statusConfig[issue.status]"></pv-tag>
        </div>
        <div class="footerContainer" v-if="issue.resolvedAt">
          <h4>{{$t("card.solvedAt")}}</h4>
          <p>{{issue.resolvedAt.toLocaleDateString()}}</p>
        </div>
        <div class="footerContainer" v-if="issue.status === 'open'" style="margin-top: 40px">
          <pv-button :disabled="isTakeIssueDisabled" :label="$t(`card.takeIssue`)" severity="sucess" @click="clickedTaken()"></pv-button>
        </div>
        <div class="footerContainer" v-if="issue.status !== 'closed' &&issue.status !== 'open' && issueBelongUser" style="margin-top: 40px">
          <pv-button :disabled="isDeTakeIssueDisabled" :label="$t(`card.detakeIssue`)" severity="Info" @click="clickedDetake()"></pv-button>
        </div>
      </div>
      <div style="display: flex; justify-content: space-evenly; padding-right: 8%">
        <div class="footerContainer" v-if="issueBelongUser" style="margin-top: 40px">
          <pv-select :options="filteredStatusOptions"
                     :optionLabel="statusLabel"
                     v-model="selectedStatus"
                     @change="selectStatus"></pv-select>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.htmlDesc{
  max-width: 500px;
  overflow-wrap: break-word;
}
.no-border {
  border: none !important;
  box-shadow: none !important;
}
.card{
  width: fit-content;
}
.contentWithImage {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.contentWithImage img {
  max-width: 300px;
  height: auto;
}
.extraInfoContainer{
  margin-top: 2rem;
}
.iconTextContainer p{
  margin: 0;
}
.iconTextContainer{
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem;
}
.card{
  padding-left: 3vh;
}
</style>