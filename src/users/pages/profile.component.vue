<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import UserCard from "@/users/components/user-card.component.vue";

export default defineComponent({
  name: "profle",
  components: {UserCard, NavHeader}
})
</script>

<template>
<nav-header></nav-header>
<user-card role="Developer" profile-image="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
           company="Helios" email="miaumiau@gamil.com" name="Cuyeyo"></user-card>
</template>

<style scoped>

</style>