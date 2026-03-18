<script>
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import TitleSubtitle from "@/shared/components/title-subtitle.component.vue";
import {
  Button as PvButton,
  Column as PvColumn,
  DataTable as PvDataTable,
  InputText as PvInputText,
  MultiSelect as PvMultiSelect, Select as PvSelect
} from "primevue";
import {FilterMatchMode, FilterOperator} from "@primevue/core/api";
import {UsersService} from "@/shared/services/users-api.service.js";


export default defineComponent({
  name: "manage-company-page.component",
  components: {PvSelect, PvMultiSelect, PvColumn, PvInputText, PvDataTable, PvButton, TitleSubtitle, NavHeader},
  data(){
    return{
      items:[{label: this.$t('nav.dashboard'), route:"/dashboard"}, {label:this.$t('nav.assignedIssues'), route:"/issues/assigned"},{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.recurrentIssues'), route:"/recurrent"},,{label: this.$t('nav.history'), route:"/history"},{label: this.$t('nav.manageCompany'), route:"/manageCompany"}],
      info: {title: "Banco del peru", sub:this.$t('manageCompany.description')},
      copied: false,
      code: null,

      filters:{
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      },
      fields:[
        { key: "name", title: this.$t('manageCompany.table.fields.name'), type: "text" },
        { key: "email", title: this.$t('manageCompany.table.fields.email'), type: "text"}
      ],
      employees:[],
      usersService: new UsersService(),
    }
  },
  async mounted() {
    const response = await this.usersService.getEmployeesByCompanyId(
        localStorage.getItem("company_id")
    )

    this.employees = response.data

    console.log(this.employees)
  },
  methods: {
    async copyCode() {
      const code =  this.code ||"BECHEPE"

      await navigator.clipboard.writeText(code)

      this.$toast.add({ severity: 'success', summary: this.$t(`manageCompany.copiedSuccesfully`), life: 3000 });

    }
  }
})
</script>

<template>
  <nav-header :items = items></nav-header>
  <title-subtitle :info="info"></title-subtitle>

  <div class="headContent">
    <div class="companyCodeContainer">

      <div style="margin-top: 4rem">
        <h2>{{ $t('manageCompany.companyCode') }}</h2>

          <p>{{ $t('manageCompany.companyCodeDescription') }}</p>
          <div class="companyCode">
            <h3 class="code">{{ code || 'BECHEPE' }}</h3>
          </div>
          <pv-button :label="$t('manageCompany.copyCompanyCode')" icon="pi pi-copy" @click="copyCode"></pv-button>

      </div>
    </div>

    <div class="connectButtons">
      <h2>{{ $t('manageCompany.integrations') }}</h2>
      <pv-button severity="secondary">

        <span class="btn-content">
          <div>
          <svg
              class="custom-icon"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fill="#5E6AD2"
                d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"
            />
          </svg>
          </div>
          {{ $t('manageCompany.connectTo') }} Linear
        </span>
      </pv-button>
      <pv-button severity="secondary">
        <span class="btn-content">
          <svg  class="custom-icon" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -30.632388516510233 255.324 285.95638851651023"><linearGradient id="a"><stop offset=".18" stop-color="#0052cc"/><stop offset="1" stop-color="#2684ff"/></linearGradient><linearGradient id="b" x1="98.031%" x2="58.888%" xlink:href="#a" y1=".161%" y2="40.766%"/><linearGradient id="c" x1="100.665%" x2="55.402%" xlink:href="#a" y1=".455%" y2="44.727%"/><path d="M244.658 0H121.707a55.502 55.502 0 0 0 55.502 55.502h22.649V77.37c.02 30.625 24.841 55.447 55.466 55.467V10.666C255.324 4.777 250.55 0 244.658 0z" fill="#2684ff"/><path d="M183.822 61.262H60.872c.019 30.625 24.84 55.447 55.466 55.467h22.649v21.938c.039 30.625 24.877 55.43 55.502 55.43V71.93c0-5.891-4.776-10.667-10.667-10.667z" fill="url(#b)"/><path d="M122.951 122.489H0c0 30.653 24.85 55.502 55.502 55.502h22.72v21.867c.02 30.597 24.798 55.408 55.396 55.466V133.156c0-5.891-4.776-10.667-10.667-10.667z" fill="url(#c)"/></svg>

          {{ $t('manageCompany.connectTo') }} Jira
        </span>
      </pv-button>
    </div>

  </div>

</template>

<style scoped>

h2{
  color: var(--contrast-blue);
}

.code{
  font-weight: normal;
  letter-spacing: 3px;
}
.companyCode{
  background-color: #F8FAFC;
  border: dashed #CBD5E1;
  border-radius:10px;
  text-align: center;
  margin: 15px 0 15px 0;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.custom-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.headContent{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin:  -2rem 4rem 0 4rem;
}

.connectButtons{
  display: flex;
  align-items: center;
  gap: 2rem;
}

</style>