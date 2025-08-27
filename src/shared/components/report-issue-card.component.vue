<script lang="ts">
import {defineComponent} from 'vue'
import { severityConfig } from '../services/severity-configurations';

export default defineComponent({
  name: "report-issue-card",
  props: {
    border: Boolean,
    issue: Object, //objeto clave - valor
    fullInformation: Boolean
  },
  data() {
    return { severityConfig };
  }
})
</script>

<template>
  <pv-card class="card"
           :class="{'no-border': border === false}"
  >

    <template #header>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px">
        <h3 style="margin:0; max-width: 700px">{{ issue.name }}</h3>
        <pv-tag :severity="severityConfig[issue.severity.value]" :value="issue.severity.label" />
      </div>
    </template>
    <template #content>
      <div class="contentWithImage">
        <div>
          <div class="htmlDesc" v-html="issue.description"></div>
          <div class="extraInfoContainer">
            <div class="iconTextContainer">
              <i class="pi pi-map-marker"></i>
              <p>{{ issue.screen_issue.label }}</p>
            </div>
            <div class="iconTextContainer">
              <i class="pi pi-user"></i>
              <p>{{ issue.role.label }}</p>
            </div>
          </div>
        </div>
        <img style="" src="https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/golden-retriever.jpg" width="300" alt="image">
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