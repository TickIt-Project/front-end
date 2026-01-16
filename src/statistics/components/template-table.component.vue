<script lang="ts">
import {defineComponent, PropType} from 'vue'
import ReportIssueCard from "@/shared/components/report-issue-card.component.vue";

import { severityConfig, statusConfig } from "@/shared/services/severity-configurations";

interface Field {
  key: string
  title: string
  type?: "text" | "select" | "date" | "tag"
  options?: Array<{ name: string }>
}

export default defineComponent({
  name: "template-table",
  components: {ReportIssueCard},
  props:{
    filters: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    issues: {
      type: Array as PropType<any[]>,
      required: true
    },
    fields: {
      type: Array as PropType<Field[]>,
      required: true
    }
  },
  data(){
    return {
      localFilters: { ...this.filters },
      productDialogVisible: false,
      issue:{},
      severityConfig,
      statusConfig,

    }
  },

  methods:{
    clearFilter(){
      this.localFilters = { ...this.filters }
    },
    showIssue(issue){
      console.log(issue.data)
      this.issue = {...issue.data};
      this.productDialogVisible = true;
    }
  }
})
</script>

<template>
  <pv-dialog v-model:visible="productDialogVisible" modal :showHeader=0 style=" width: 50rem; " :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closable=0>

      <report-issue-card :fullInformation="true" :border="false" :issue="issue" style="padding-right: 2rem"></report-issue-card>
      <div style="display:flex; justify-content: center; width: 100%;">
        <pv-button label="Cancel" @click="productDialogVisible=false" variant="text" style="width: 8rem;"></pv-button>
      </div>
  </pv-dialog>
  <pv-data-table  v-model:filters="localFilters" :value="issues" paginator :rows="10" filterDisplay="menu">
    <template #header>
      <div class="flex justify-between">
        <pv-button type="button" icon="pi pi-filter-slash" label="Clear" variant="outlined" @click="clearFilter" />
      </div>
    </template>
    <span v-for="field in fields" :key="field.key">
          <pv-column       :field="field.key"
                           :header="field.title"
                           :filterField="field.key"
                           :dataType="field.type === 'date' ? 'date' : 'text'"
                           :showFilterMatchModes="!(field.type === 'select' || field.type === 'tag')"
                           style="min-width: 11rem; max-width: 15rem" >
          <template #empty> No issues found. </template>
            <template #body="{ data }">
              <template v-if="field.type === 'tag'">
                <pv-tag
                    :value="$t('status.' + data[field.key])"
                    :severity="severityConfig[data[field.key]] || statusConfig[data[field.key]] || null"
                />
              </template>
              <template v-else-if="field.type === 'date'">
                <span v-if="data[field.key] != null">
                {{ data[field.key].toLocaleDateString() }}
                </span>
              </template>
              <template v-else-if = "data[field.key] != null">
                  <template v-if="data[field.key]?.img_url">
                      <div style="display: flex; align-items: center; gap: 5px">
                          <img
                              :src="data[field.key].img_url"
                              alt="profile"
                              style="max-width: 2em; border-radius: 50%"
                          />
                          {{ data[field.key].name }}
                      </div>
                  </template>
                  <template v-else>
                {{ data[field.key] }}
                  </template>
              </template>
            </template>
            <template #filter="{ filterModel }">
                <pv-input-text
                    v-if="field.type === 'text'"
                    v-model="filterModel.value"
                    :placeholder="$t('statistics.searchBy') + field.title"
                />

                    <!-- arrow function de si existe label lo usa, sino name. option es cada objeto del array -->
                    <pv-multi-select     v-else-if="field.type === 'select'"
                                         v-model="filterModel.value"
                                         :options="field.options"
                                         :optionLabel="(option) => option.label || option.name"
                                         :optionValue="(option) => option.value || option"
                                         display="chip">
                        <template #option="slotProps">
                            <div v-if="slotProps.option?.img_url" style="display: flex; align-items: center;gap: 5px">
                              <img
                                  :src="slotProps.option.img_url"
                                  :alt="slotProps.option.name"
                                  style="max-width: 2em; border-radius: 50%"
                              />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                            <div v-else>
                              <span>{{ slotProps.option.label }}</span>
                            </div>
                           </template>
                    </pv-multi-select>

                    <!-- this one for tags -->

              <pv-multi-select
                  v-else-if="field.type === 'tag'"
                  v-model="filterModel.value"
                  :options="field.options"
                  optionLabel="label"
                  optionValue="value"
                  display="chip"
              >
                <template #option="slotProps">
                  <pv-tag :value="slotProps.option.label" :severity="severityConfig[slotProps.option.value] || statusConfig[slotProps.option.value] || null" />
                </template>
              </pv-multi-select>

                  <pv-date-picker v-else-if="field.type === 'date'"
                                  v-model="filterModel.value"
                                  dateFormat="mm/dd/yy"
                                  placeholder="mm/dd/yyyy" />

                </template>
        </pv-column>

        </span>
        <pv-column>
          <template #body="slotProps">
            <pv-button icon="pi pi-plus"  rounded class="mr-2" @click="showIssue(slotProps) " :label="$t('statistics.fields.seeMore') "  />
          </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>