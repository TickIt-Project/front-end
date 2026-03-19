<script>
import {defineComponent} from 'vue'
import ParallaxDecoration from "@/public/components/parallax-decoration.component.vue";
import NavHeader from "@/public/components/nav-header.component.vue";
import AuthForm from "@/shared/components/auth-form.component.vue";
import { AuthService } from '@/public/services/auth-api.service';


import {zodResolver} from "@primevue/forms/resolvers/zod";
import {z} from "zod";
import {UsersService} from "@/shared/services/users-api.service.js";

export default defineComponent({
  name: "signin",
  components: {AuthForm, NavHeader, ParallaxDecoration},
  data() {
    return {
      resolver: zodResolver(
          z.object({
            email: z
                .string()
                .min(3, { message: this.$t('auth.signIn.messages.email') }),
            password: z
                .string()
                .min(8, { message: this.$t('auth.signIn.messages.password') }),
          })
      ),
      /**
       * @property {Array<Object>} fields
       * @description Defines the structure of form fields to be rendered dynamically
       */
      fields: [
        { name: 'email',       label: this.$t('auth.labels.name'),type: 'text', inputType: 'text',             placeholder: this.$t('auth.placeholders.name'), initialValue: '' },
        { name: 'password',   label: this.$t('auth.labels.password'),type: 'password', inputType: 'password', placeholder: this.$t('auth.placeholders.password'), initialValue: '' },
      ],
      authService: new AuthService(),
      userService: new UsersService(),
    };
  },
  methods: {
    handleSlackSignIn() {
      console.log("Usuario quiere signin con Slack");
    },
    async onFormSubmit(formData) {
      console.log(formData)

      try {
        const response = await this.authService.signIn(formData)

        const token = response.data.token
        localStorage.setItem('auth_token', token)

        const userId = response.data.userId
        console.log(userId);
        localStorage.setItem('user_id', userId)

        const companyId = response.data.companyId
        localStorage.setItem('company_id', companyId)

      } catch (error) {
        console.error('Error in sign in', error)
      }

      try {
        const response = await this.userService.getUserByUserId(localStorage.getItem('user_id'))

        const companyRoleId = response.data.companyRoleId
        localStorage.setItem('company_role_id', companyRoleId)

        this.$router.push('/issues/reported')

      } catch (error) {
        console.error('Error in get user by id', error)
      }
    }
  }
})
</script>

<template>
  <div class="sign-layout">
    <img src="@/assets/Support_SVG.svg" alt="Illustration of support" width="600"/>
    <div class="form-layout">
      <div class="form-title">
        <div class="text">
          <h1>{{$t('auth.welcome_title')}}<span>TickIT</span></h1>
          <p>{{$t('auth.signIn.welcome_message')}}</p>
        </div>
        <img src="@/assets/TickIT_Logo.svg" alt="TickIT Logo">
      </div>
      <div class="form-container">
        <auth-form
            :resolver="resolver"
            :fields="fields"
            :submitButton = "$t('auth.signIn.button')"
            :slack_label="$t('auth.signIn.slackButton')"
            @slack-event="handleSlackSignIn"
            @submit-form="onFormSubmit">
        </auth-form>
        <div class="url-links">
          <p>
            {{$t('auth.signIn.notRegistered')}}
          </p>
          <div></div>
          <router-link to="/signUp" class="inline text-sm text-blue-600 hover:underline">
            {{$t('auth.signIn.signUp')}}
          </router-link>

        </div>
      </div>
    </div>
  </div>
  <parallax-decoration class="decoration"></parallax-decoration>
</template>

<style scoped>
*{
  color: var(--contrast-gray)
}
.sign-layout {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 4vh;
}
.url-links{
  display: flex;
  align-items: center;
}
.url-links div{
  flex-grow: 1;
}

.form-layout{
  display: flex;
  width: 24%;
  flex-direction: column;
}
.form-title{
  display: flex;
  margin-bottom: 20px;
}
.form-title img{
  width: 20%;
}
.decoration {
  position: absolute;
  z-index: -1;
}
.text h1{
  font-weight: 600;
  margin-bottom: 0;
}
.text h1 span{
  font-weight: 800;
  color: var(--contrast-blue);
}
.text p{
  margin-top: 2px;
  margin-left: 6px;
  font-weight: 350;
  font-size: 15px;
}


</style>