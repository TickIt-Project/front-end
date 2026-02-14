<script>
import {defineComponent} from 'vue'
import ParallaxDecoration from "@/public/components/parallax-decoration.component.vue";
import NavHeader from "@/public/components/nav-header.component.vue";
import AuthForm from "@/shared/components/auth-form.component.vue";
import { AuthService } from '@/public/services/auth-api.service';

//resolver
import {zodResolver} from "@primevue/forms/resolvers/zod";
import {z} from "zod";

export default defineComponent({
  name: "signup",
  components: {AuthForm, NavHeader, ParallaxDecoration},
  data() {
    return {
      resolver: zodResolver(
          z.object({
            email: z
                .email({ message: this.$t('auth.signup.messages.email') }),
            username: z.string().min(3, { message: this.$t('auth.signup.messages.name.min') }).max(15, { message: 'auth.signup.messages.name.max' }),
            companyCode: z.string().min(6, { message: this.$t('auth.signup.messages.companyId') }),
            password: z.string().min(8, { message: this.$t('auth.signup.messages.password') }),
          })
      ),
      /**
       * @property {Array<Object>} fields
       * @description Defines the structure of form fields to be rendered dynamically
       */
      fields: [
        { name: 'username',       label: this.$t('auth.labels.name'),type: 'text', inputType: 'text',             placeholder: this.$t('auth.placeholders.name'), initialValue: '' },
        { name: 'email',      label: this.$t('auth.labels.email'),type: 'text', inputType: 'text',            placeholder: this.$t('auth.placeholders.email'), initialValue: '' },
        { name: 'password',   label: this.$t('auth.labels.password'),type: 'password', inputType: 'password', placeholder: this.$t('auth.placeholders.password'), initialValue: '' },
        { name: 'companyCode',  label: this.$t('auth.labels.companyId'),type: 'text', inputType: 'text',        placeholder: this.$t('auth.placeholders.companyId'), initialValue: '' },
      ],
      authService: new AuthService(),
    };
  },
  methods: {
    handleSlackSignUp() {
      console.log("Usuario quiere signup con Slack");
    },
    async onFormSubmit(formData) {
      try {
        const payload = {
          ...formData,
          "companyRoleId": "31000000-0000-0000-0000-000000000000",
          "role": "EMPLOYEE",
          "language": "ES",
          "notify_active": true,
          "profileImageUrl": "https://cdn.pfps.gg/pfps/2301-default-2.png"
        }

        const fd = new FormData()

        fd.append(
            "user",
            new Blob([JSON.stringify(payload)], {
              type: "application/json"
            })
        )
        let response = await this.authService.signUp(fd)

        console.log(response)

        this.$router.push('/signIn')

      } catch (error) {
        console.error('Error en sign up', error)
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
          <p>{{$t('auth.signup.welcome_message')}}</p>
        </div>
        <img src="@/assets/TickIT_Logo.svg" alt="TickIT Logo">
      </div>
      <div class="form-container">
        <auth-form
            :resolver="resolver"
            :fields="fields"
            :submitButton = "$t('auth.signup.button')"
            :slack_label="$t('auth.signup.slackButton')"
            @slack-event="handleSlackSignUp"
            @submit-form="onFormSubmit">
        </auth-form>
        <div class="url-links">
          <p>
            {{$t('auth.signup.already_registered')}}
          </p>
          <div></div>
          <router-link to="/signIn" class="inline text-sm text-blue-600 hover:underline">
            {{$t('auth.signup.sign_in')}}
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