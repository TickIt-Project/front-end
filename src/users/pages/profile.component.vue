<script lang="ts">
import {defineComponent} from 'vue'
import NavHeader from "@/public/components/nav-header.component.vue";
import UserCard from "@/users/components/user-card.component.vue";
import { UsersService } from '@/shared/services/users-api.service';
import {UsersAssembler} from '@/shared/services/users-assembler';

export default defineComponent({
  name: "profle",
  components: {UserCard, NavHeader},
  data() {
    return {
      user: null,
      userService: new UsersService(),
      userAssembler: new UsersAssembler()
    };
  },
  mounted() {
    this.userService.getCurrentUser().then(res => {
      this.user = this.userAssembler.EntityFromResponse(res.data);
    });
  },
  methods: {
    //El blob se storea em memoria, si cambias la img aun no esta el imgUploadService
    onFieldChanged(payload) {
      this.user[payload.field] = payload.value;
      this.userService.updateUser({
        [payload.field]: payload.value
      }).catch(err => {
            console.error('Error updating user', err);
      });
    }
  }

})
</script>

<template>
<nav-header></nav-header>
  <user-card
      v-if="user"
      v-model:name="user.name"
      v-model:email="user.email"
      v-model:imgUrl="user.imgUrl"
      :role="user.role"
      :company="user.company"
      @field-changed="onFieldChanged"
  />
</template>

<style scoped>

</style>