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
    },
    emits: ['field-changed'],
    data() {
      return {
        localName: this.name,
        localEmail: this.email
      };
    },

    watch: {
      name(val) {
        this.localName = val;
      },
      email(val) {
        this.localEmail = val;
      }
    },

    methods: {
      triggerUpload() {
        (this.$refs.fileInput as HTMLInputElement).click();
      },

      onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);

        this.$emit('field-changed', {
          field: 'profile_image',
          value: preview
        });
      },
      saveName(close: () => void) {

        this.$emit('field-changed', {
          field: 'name',
          value: this.localName
        })},
      saveEmail(close: () => void) {
        this.$emit('field-changed', {
          field: 'email',
          value: this.localEmail
        })},
      }
  });
  </script>

  <template>
    <div style="display: flex; justify-content: center; align-items: center; height: 90vh">
      <div class="card">
        <div class="content">
          <div class="header">
            <div class="avatar-wrapper" @click="triggerUpload">
              <img :src="profileImage" alt="Profile" class="avatar" />

              <div class="avatar-overlay">
                <i class="pi pi-pencil"></i>
              </div>

              <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="onFileSelected"
              />
            </div>
            <h2 class="company">{{ company }}</h2>
          </div>
          <div class="info">

            <label for="name">{{$t('user.fields.name')}}</label>
            <pv-inplace>
              <template #display>
                {{ name }}
                <i class ="pi pi-pencil pencilIcon"></i>
              </template>
              <template #content="{ closeCallback }">
                <span class="inline-flex items-center gap-2">
                    <pv-input-text v-model="localName" autofocus />
                    <pv-button icon="pi pi-check" text severity="success" @click="saveName(closeCallback())" />
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
                    <pv-input-text v-model="localEmail" autofocus />
                    <pv-button icon="pi pi-check" text severity="success" @click="saveEmail(closeCallback())" />
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

  .avatar-wrapper {
    position: relative;
    width: 96px;
    height: 96px;
    cursor: pointer;
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .avatar-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .avatar-overlay i {
    color: white;
    font-size: 1.5rem;
  }

  .avatar-wrapper:hover .avatar-overlay {
    opacity: 1;
  }
  </style>