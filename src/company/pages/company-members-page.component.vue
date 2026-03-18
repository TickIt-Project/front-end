<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "company-members-page.component"
})
</script>

<template>
  <pv-data-table v-model:filters="filters" :value="employees" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading"
                 :globalFilterFields="['name', 'email']">
    <template #header>
      <div class="flex justify-end">
        <pv-icon-field>
          <pv-input-icon>
            <i class="pi pi-search" />
          </pv-input-icon>
          <pv-input-text v-model="filters['global'].value" placeholder="Keyword Search" />
        </pv-icon-field>
      </div>
    </template>
    <template #empty> No employees found. </template>
    <template #loading> Loading employees data. Please wait. </template>
    <pv-column field="name" header="Name" style="min-width: 12rem">
      <template #body="{ data }">
        {{ data.name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
      </template>
    </pv-column>
    <pv-column header="email" filterField="email" style="min-width: 12rem">
      <template #body="{ data }">
        {{ data.email }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by country" />
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>