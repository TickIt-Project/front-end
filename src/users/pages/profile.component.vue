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
    onFieldChanged(payload) {
      this.user[payload.field] =
          payload.field === 'profile_image'
              ? URL.createObjectURL(payload.value)
              : payload.value;

      if (payload.field === 'profile_image') {

        this.userService.updateProfileImage(this.user.id, payload.value)
            .catch(err => console.error('Error uploading image', err));
      }
      else if (payload.field === 'password') {
        this.userService.updatePassword({
          userId: this.user.id,
          oldPassword: payload.value.oldPassword,
          newPassword: payload.value.newPassword
        }).catch(err => console.error('Error updating password', err));

        return;
      }else {
        this.userService.updateUser({
          [payload.field]: payload.value
        }).catch(err => console.error('Error updating user', err));
      }
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
      v-model:profile_image="user.imgUrl"
      :role="user.role"
      :company="user.company"
      @field-changed="onFieldChanged"
  />
</template>

<style scoped>

</style>