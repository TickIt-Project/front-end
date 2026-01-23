<script lang="ts">
import { ref } from 'vue';

export default{
  name: "nav-header",
  props: {
    items: Array, //label, route
  },
  data(){
    return {
      cyanMenu: ref({
        handle: {
          borderRadius: '4px'
        },
        colorScheme: {
          light: {
            root: {
              background: 'var(--pastel-cyan)',
              borderRadius: '0px',
              borderColor: 'none',
              itemFocusBackground:'{sky.100}',
            },
            handle: {
              checkedBackground: '{amber.50}',
              checkedHoverBackground: '{amber.100}'
            }
          },

        }
      })
    }
  }
}
</script>

<template>

  <pv-menubar :model="items" :dt="cyanMenu">
    <template #start><img src="@/assets/TickIT_Logo.svg" alt="TickIT Logo" width="30"><h1>TickIT</h1> </template>

    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>

    </template>

    <template #end>
      <router-link to="/profile">
        <pv-avatar icon="pi pi-user" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
      </router-link>
    </template>

  </pv-menubar>

</template>

<style scoped>

h1{
  font-size: 1.5rem;
  font-family: "Unbounded", sans-serif;
  margin-right: 20px;
}
img{
  margin-right: 10px;
}


</style>