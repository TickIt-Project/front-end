<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "title-subtitle",
  props:{
    info: Object
  }
})
</script>

<template>
  <div>
  <h1>{{info.title}}</h1>
  <p>{{info.sub}}</p>
  </div>
</template>

<style scoped>
div{
  margin: 2vh 5vh;
}
h1{
  color: var(--contrast-blue);
}
</style>