<script>
import {defineComponent} from 'vue'
import { IssueReportService } from '@/troubleshooting/services/report-api.service.js'
import {z} from "zod";
import {FileUpload as PvFileUpload, Select as PvSelect, Tag as PvTag} from "primevue";
import {FormField as PvFormField} from "@primevue/forms";


export default {
  name: "full-stepper",
  components: {PvTag, PvFormField, PvFileUpload, PvSelect},
  data() {
    return {
      formValues: {
        name: '',
        description: '',
        screen_issue: '',
        url: '',
        role: '',
        severity: '',
      },
      //todo change url to service
      uploadUrl: 'https://httpbin.org/post',
      value: '',
      maxChars: 3000,
      severityMap: {
        Critical: 'danger',
        High: 'warn',
        Medium: 'info',
        Low: 'success'
      },
      reportService: new IssueReportService(),
      /**
       * @property {Array<Object>} fields
       * @description Defines the structure of form fields to be rendered dynamically
       */
      fields: [
        { name: 'name',       label: this.$t('report.steps.1.fields.title'),          type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.title'), initialValue: '' },
        { name: 'description',label: this.$t('report.steps.1.fields.description'),    type: 'editor', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.description'), initialValue: '' },
        { name: 'screen_issue',        label: this.$t('report.steps.1.fields.screen_issue'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.screen_issue'), initialValue: '', editable: true, options:[]},
        { name: 'url',        label: this.$t('report.steps.1.fields.url'),            type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.url'), initialValue: '' },
        { name: 'role',        label: this.$t('report.steps.1.fields.role'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.role'), initialValue: '', editable: false, options:[] },
        { name: 'severity',        label: this.$t('report.steps.1.fields.severity'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.severity'), initialValue: '', editable: false, options:[] },
      ]
    }
  },
  mounted(){
    Promise.all([
      this.reportService.getRolesOfCompanyByCompanyId(),
      this.reportService.getSeverityOptions(),
      this.reportService.getScreenLocationOptions()
    ])
        .then(([rolesRes, severityRes, screenRes]) => {
          // role loading
          const roleField = this.fields.find(f => f.name === 'role');
          if (roleField && Array.isArray(rolesRes.data)) {
            roleField.options = rolesRes.data.map(role => ({
              label: role,
              value: role
            }));
          }

          // severity
          const severityField = this.fields.find(f => f.name === 'severity');
          if (severityField && Array.isArray(severityRes.data)) {
            severityField.options = severityRes.data.map(sev => ({
              label: sev,
              value: sev
            }));
          }

          // screen
          const screenField = this.fields.find(f => f.name === 'screen_issue');
          if (screenField && Array.isArray(screenRes.data)) {
            screenField.options = screenRes.data.map(loc => ({
              label: loc,
              value: loc
            }));
          }
        })
        .catch(err => {
          console.error('Error cargando selects:', err);
        });
  },
  methods: {
    onUpload(event) {
      console.log('Archivo subido correctamente')
    },
    onError(event) {
      console.error('Error al subir archivo:')
    }
  },
  computed: {
    nameLength() {
      return (this.formValues.name || '').trim().length;
    },

    descPlainLength() {
      const html = this.formValues.description || '';
      return html.replace(/<[^>]*>/g, '').trim().length;
    },


    isOverLimit() {
      return this.nameLength > 100 || this.descPlainLength > 3000;
    },

    requiredFieldsFilled() {
      const urlRequired = this.isScreenIssueTyped;
      return (
          this.nameLength >= 3 &&
          this.descPlainLength > 0 &&
          !!this.formValues.screen_issue &&
          !!this.formValues.role &&
          !!this.formValues.severity &&
          (!urlRequired || (this.formValues.url && this.formValues.url.trim() !== ''))
      );
    },

    isScreenIssueTyped() {
      const field = this.fields.find(f => f.name === 'screen_issue');
      if (!field) return false;
      const currentValue = this.formValues.screen_issue || '';
      const match = field.options.some(opt => opt.value === currentValue);
      return !match && currentValue.trim() !== '';
    },

    formIsValid() {
      return this.requiredFieldsFilled && !this.isOverLimit;
    }
  },

  watch: {
    formValues: {
      handler() {
        console.log('formValues', this.formValues);
        console.log('nameLength', this.nameLength, 'descPlainLength', this.descPlainLength, 'isOverLimit', this.isOverLimit, 'requiredFilled', this.requiredFieldsFilled, 'formIsValid', this.formIsValid);
      },
      deep: true
    }
  },
}
</script>

<template>
  <pv-stepper value="1">
    <pv-step-item value="1">
      <pv-step>{{$t('report.steps.1.header')}}</pv-step>
      <pv-step-panel v-slot="{ activateCallback }">
        <div class="content">
          <div class="formContainer">
            <div class="formContainer" v-for="field in fields" :key="field.name">
              <pv-float-label v-if="field.type === 'text'" variant="on" required>
                <pv-input-text
                    :id="field.name"
                    v-model="formValues[field.name]"
                    :placeholder="field.placeholder"
                    fluid
                    :disabled="field.name === 'url' && !isScreenIssueTyped"
                    :maxlength="field.name === 'name' ? 100 : undefined"
                />
                <label :for="field.name">{{ field.label }}</label>
              </pv-float-label>


              <div v-if="field.type === 'editor'">
                <label class="editorLabel" :for="field.name">{{ field.label }}</label>
                <pv-editor
                    v-model="formValues[field.name]"
                    editorStyle="height: 45vh; overflow-y: auto;">
                    <template v-slot:toolbar>
                      <span class="ql-formats">
                          <button v-pv-tooltip.bottom="'Bold'" class="ql-bold"></button>
                          <button v-pv-tooltip.bottom="'Italic'" class="ql-italic"></button>
                          <button v-pv-tooltip.bottom="'Underline'" class="ql-underline"></button>
                      </span>
                      <span class="ql-formats">
                        <button v-pv-tooltip.bottom="'Ordered List'" class="ql-list" value="ordered"></button>
                      </span>

                    </template>
                </pv-editor>

                <p :style="{ color: descPlainLength > maxChars ? 'red' : 'inherit' }">
                  {{ descPlainLength }} / {{ maxChars }} {{ $t('report.steps.1.characters') }}
                </p>
              </div>

              <pv-float-label v-if="field.type === 'select'" variant="on">
                <pv-select
                    v-model="formValues[field.name]"
                    :editable="field.editable"
                    class="select"
                    :options="field.options"
                    optionLabel="label"
                    optionValue="value"
                    :inputId="field.name"
                />
                <label :for="field.name">{{ field.label }}</label>
              </pv-float-label>
            </div>
          </div>
          </div>
        <div class="buttons">
          <pv-button :disabled="!formIsValid" :label="$t('report.steps.buttons.next')" @click="activateCallback('2')" />
        </div>
      </pv-step-panel>
    </pv-step-item>
    <pv-step-item value="2">
      <pv-step>{{$t('report.steps.2.header')}}</pv-step>
      <pv-step-panel v-slot="{ activateCallback }">
        <div class="content">
          <pv-file-upload
              name="file"
              :url="uploadUrl"
              mode="advanced"
              :auto="true"
              :multiple="false"
              accept="image/png, image/jpeg"
              :maxFileSize="5 * 1024 * 1024"
              dragDrop
              :chooseLabel="$t('report.steps.2.select_img')"
              :uploadLabel="$t('report.steps.2.upload')"
              :cancelLabel="$t('report.steps.2.cancel')"
              :showUploadButton="false"
              @upload="onUpload"
              @error="onError"
          >
            <template #empty>
              <div class="fileUpload">
                <i class="pi pi-cloud-upload" />
                <p>{{$t('report.steps.2.img_text')}}</p>
              </div>
            </template>
          </pv-file-upload>

        </div>
        <div class="buttons">
          <pv-button :label="$t('report.steps.buttons.back')" severity="secondary" @click="activateCallback('1')" />
          <pv-button :label="$t('report.steps.buttons.next')" @click="activateCallback('3')" />
        </div>
      </pv-step-panel>
    </pv-step-item>
      <pv-step-item value="3">
        <pv-step>{{$t('report.steps.3.header')}}</pv-step>
        <pv-step-panel v-slot="{ activateCallback }">
          <div class="content">
            <pv-card class="card">

              <template #header>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px">
                <h3 style="margin:0;">{{ formValues.name }}</h3>
                <pv-tag :severity="severityMap[formValues.severity]" :value="formValues.severity" />
                </div>
              </template>
              <template #content>
                <div class="contentWithImage">
                  <div>
                  <div v-html="formValues.description"></div>
                    <div class="extraInfoContainer">
                      <div class="iconTextContainer">
                        <i class="pi pi-map-marker"></i>
                        <p>{{ formValues.screen_issue }}</p>
                      </div>
                      <div class="iconTextContainer">
                        <i class="pi pi-user"></i>
                        <p>{{ formValues.role }}</p>
                      </div>
                    </div>
                  </div>
                  <img style="" src="https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/golden-retriever.jpg" width="300" alt="image">
                </div>
              </template>
            </pv-card>
          </div>
          <div class="buttons">
            <pv-button :label="$t('report.steps.buttons.back')" severity="secondary" @click="activateCallback('2')" />
            <pv-button :label="$t('report.steps.buttons.submit')"/>
          </div>
        </pv-step-panel>
    </pv-step-item>
  </pv-stepper>
</template>

<style scoped>
.card{
  width: fit-content;
}
.contentWithImage {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.contentWithImage img {
  max-width: 300px;
  height: auto;
}
.extraInfoContainer{
  margin-top: 2rem;
}
.iconTextContainer p{
  margin: 0;
}
.iconTextContainer{
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem;
}
.card{
  padding-left: 3vh;
}
.fileUpload i{
  border-radius: 50%;
  border: 3px solid;
  padding: 4vh;
  font-size: 5vh;
  color: gray;
}
.fileUpload{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.buttons{
  margin-top: 2vh ;
  display: flex;
  gap: 1rem;
}
.content{
  max-height: 66vh;
}
.formContainer{
  max-width: 80%;
  max-height: inherit;
  display: flex;
  gap: 2vh;
  column-gap: 5vh;
  margin-left: 1vh;
  flex-direction: column;
  flex-wrap: wrap;
}
.select{
  width: 100%;
}
.editorLabel{
  color: darkslategray;
  font-weight: 500;
}

p{
  font-size: 15px;
}
</style>