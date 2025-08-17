  <script lang="ts">
  import {defineComponent} from 'vue'
  import {Button as PvButton, Inplace as PvInplace, InputText as PvInputText} from "primevue";

  export default defineComponent({
    name: "user-card",
    components: {PvButton, PvInputText, PvInplace},
    props: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      role: { type: String, required: true },
      company: { type: String, required: true },
      profileImage: { type: String, required: true }
    }
  })
  </script>

  <template>
    <div style="display: flex; justify-content: center; align-items: center; height: 90vh">
      <div class="card">
        <div class="content">
          <div class="header">
            <img :src="profileImage" alt="Profile" class="avatar" />
            <h2 class="company">{{ company }}</h2>
          </div>
          <div class="info">
            <p></p>

            <label for="name">{{$t('user.fields.name')}}</label>
            <pv-inplace>
              <template #display>
                {{ name }}
                <i class ="pi pi-pencil pencilIcon"></i>
              </template>
              <template #content="{ closeCallback }">
                <span class="inline-flex items-center gap-2">
                    <pv-input-text v-model="name" autofocus />
                    <pv-button icon="pi pi-check" text severity="success" @click="closeCallback" />
                </span>
              </template>
            </pv-inplace>
            <label for="email">{{$t('user.fields.email')}}</label>
            <pv-inplace>
              <template #display>
                {{ email }}
                <i class ="pi pi-pencil pencilIcon"></i>
              </template>
              <template #content="{ closeCallback }">
                <span class="inline-flex items-center gap-2">
                    <pv-input-text v-model="email" autofocus />
                    <pv-button icon="pi pi-check" text severity="success" @click="closeCallback" />
                </span>
              </template>
            </pv-inplace>

          </div>
          <div class="footer">
            <pv-button class="btn">Change Password</pv-button>

            <p class="role">{{ role }}</p>
          </div>
        </div>
      </div>
    </div>
    <svg width="500" height="500" viewBox="-15 -30 30 40">
      <path
          d="M -2 0 L -2 0 C -5 -8 -7 -13 -10 -24 L -9 -24 C -6 -12 -4 -7 -1 0
       M -1 0 L 2 0 M 2 0 L 2 0 C 5 -8 7 -13 10 -24 L 9 -24 C 6 -12 4 -7 1 0
       L 2 0 L 2 1 L -2 1 L -2 0 L 2 0 L 2 0"
      stroke="var(--contrast-blue)"
      />
    </svg>
  </template>

  <style scoped>
  .footer{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pencilIcon{
    margin-left: 10px;
    font-size: 13px;
  }
  label{
    font-weight: bold;
    color: var(--contrast-blue);
  }
  svg{
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  .header{
    display: flex;
    align-items: start;
  }
  .header h2{
    margin-top: 0;
    margin-left: auto;
    color: var(--contrast-blue);
  }
  .card {
    background: var(--pastel-cyan);
    border-radius: 10px;
    padding: 3vh;
    text-align: left;
    width: fit-content;
    min-width: 20rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  .company {
    font-weight: bold;
    text-align: right;
  }
  .info {
    margin-top: 10px;
  }
  .icon {
    font-size: 0.8em;
  }

  .role {
    color: var(--contrast-gray);
    text-align: right;
  }
  </style>