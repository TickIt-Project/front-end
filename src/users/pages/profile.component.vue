<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import UserCard from "@/users/components/user-card.component.vue";
import { UsersService } from '@/shared/services/users-api.service';

export default defineComponent({
  name: "profle",
  components: {UserCard, NavHeader},
  data() {
    return {
      user: null
    };
  },
  mounted() {
    const userService = new UsersService();
    userService.getCurrentUser().then(res => {
      this.user = res.data;
    });
  }

})
</script>

<template>
<nav-header></nav-header>
  <user-card
      v-if="user"
      v-model:name="user.name"
      v-model:email="user.email"
      v-model:profileImage="user.profile_image"
      :role="user.role"
      :company="user.company"
  />
</template>

<style scoped>

</style>