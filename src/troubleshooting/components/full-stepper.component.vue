<script>
import { IssueReportService } from '@/shared/services/report-api.service.js'
import {FileUpload as PvFileUpload, Select as PvSelect, Tag as PvTag} from "primevue";
import {FormField as PvFormField} from "@primevue/forms";
import ReportIssueCard from "@/shared/components/report-issue-card.component.vue";
import {IssueReportAssembler} from "@/shared/services/report-assembler.js";


export default {
  name: "full-stepper",
  components: {ReportIssueCard, PvTag, PvFormField, PvFileUpload, PvSelect},
  emits:["onFormSubmit"],
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      formValues: {
        title: '',
        description: '',
        url: '',
        severity: '',
        screenResolved: null,
      },
      value: '',
      maxCharsDesc: 2500,
      maxCharsTitle: 100,
      reportService: new IssueReportService(),
      reportAssembler: new IssueReportAssembler(),
      /**
       * @property {Array<Object>} fields
       * @description Defines the structure of form fields to be rendered dynamically
       */
      fields: [
        { name: 'title',       label: this.$t('report.steps.1.fields.title'),          type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.title'), initialValue: '' },
        { name: 'url',        label: this.$t('report.steps.1.fields.url'),            type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.url'), initialValue: '' },
        { name: 'severity',        label: this.$t('report.steps.1.fields.severity'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.severity'), initialValue: '', editable: false, options:[] },
        { name: 'category',        label: this.$t('report.steps.1.fields.category'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.category'), initialValue: '', editable: false, options:[] },
        { name: 'detailed_comments',label: this.$t('report.steps.1.fields.deatailed_comments'),    type: 'editor', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.deatailed_comments'), initialValue: '' },
      ]
    }
  },
  beforeUnmount() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  },
  methods: {
    formValuesToEntity(formValues) {
      let report = this.reportAssembler.EntityFromResponse({
        id : null,
        companyId : localStorage.getItem('company_id'),
        title : formValues.title,
        description : formValues.description,
        screen : this.screenResolved,
        url: formValues.url,
        companyRole : localStorage.getItem('company_role_id'),
        severity : formValues.severity.value,
        imgUrl: this.previewUrl,
        status : "Open",
        reporter : localStorage.getItem('user_id'),
        assignee : null,
        resolvedAt : null,
        submittedAt : null,
        ticketOption : false}
      );
      console.log(formValues);
      console.log(report);
      return report;
    },
    formValuesToFormData() {
      const fd = new FormData();

      fd.append('title', this.formValues.title);
      fd.append('description', this.formValues.description);
      fd.append('issueScreenUrl', this.formValues.url);
      fd.append('severity', this.formValues.severity);

      fd.append('companyId', localStorage.getItem('company_id'));
      fd.append('companyRole', localStorage.getItem('company_role_id'));
      fd.append('reporterId', localStorage.getItem('user_id'));

      if (this.screenResolved) {
        //todo change when back receives postScreenByName
        fd.append('screenLocationId', "9c3d5d1e-4c7c-4fff-8848-d266d663de3f");
      }

      if (this.selectedFile) {
        fd.append('file', this.selectedFile);
      }

      console.log("Form Values: ",fd);
      return fd
    },
  async convertScreen(url){
    const parts = url.replace(/^https?:\/\//, '').split('/');
    const screenPartUrl = parts[1]?.toLowerCase() ?? ''
    let screenName = await this.reportService.getScreenLocationByName(screenPartUrl)

    if(screenName!= null){
      return screenName;
    }
    else{
      return screenPartUrl
    }
  },
    async onUpload(event) {
      const file = event.files[0];

      //clean
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }

      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
    },

    async submitReport() {

      let fd = this.formValuesToFormData()
      await this.reportService.createReport(fd);
    }
  },
  computed: {
    titleLength() {
      return (this.formValues.title || '').trim().length;
    },

    descPlainLength() {
      const html = this.formValues.description || '';
      return html.replace(/<[^>]*>/g, '').trim().length;
    },

    isOverLimit() {
      return this.titleLength > this.maxCharsTitle || this.descPlainLength > this.maxCharsDesc;
    },

    requiredFieldsFilled() {
      return (
          this.titleLength >= 3 &&
          this.descPlainLength > 3 &&
          !!this.formValues.url &&
          !!this.formValues.severity &&
          !!this.formValues.url
      );
    },

    formIsValid() {
      return this.requiredFieldsFilled && !this.isOverLimit;
    },

  },
  watch: {
    'formValues.url': {
      async handler(newUrl) {
        if (!newUrl) {
          this.screenResolved = null;
          return;
        }
        this.screenResolved = await this.convertScreen(newUrl);
      }
    }
  }
}
</script>

<template>
  <pv-stepper value="1">
    <pv-step-item value="1">
      <pv-step>{{$t('report.steps.1.header')}}</pv-step>
      <pv-step-panel v-slot="{ activateCallback }">
        <div class="content">
          <div class="formContainer">
            <div
                v-for="field in fields"
                :key="field.name"
                :class="['fieldWrapper', { halfWidth: field.name !== 'title' }]"
            >
              <pv-float-label v-if="field.type === 'text'" variant="on" required>
                <pv-input-text
                    :id="field.name"
                    v-model="formValues[field.name]"
                    :placeholder="field.placeholder"
                    fluid
                    :maxlength="field.name === 'name' ? 100 : undefined"
                />
                <label :for="field.name">{{ field.label }}</label>
              </pv-float-label>

              <pv-float-label v-if="field.type === 'select'" variant="on">
                <div class="select-with-tooltip">
                  <pv-select
                      v-model="formValues[field.name]"
                      :editable="field.editable"
                      class="select"
                      :options="field.options"
                      optionLabel="label"
                      :inputId="field.name"
                  />



                  <i
                      v-if="field.name === 'severity'"
                      class="pi pi-info-circle severity-info"
                      v-tooltip="{
    value: $t('severity.tooltip.all'),
    escape: false
  }"
                  />
                </div>

                <label :for="field.name">
                  {{ field.label }}
                </label>
              </pv-float-label>

              <div v-if="field.type === 'editor'">
                <label class="editorLabel" :for="field.name">{{ field.label }}</label>
                <pv-editor
                    v-model="formValues[field.name]"
                    editorStyle="height: 15vh; overflow-y: auto;">
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

                <p :style="{ color: descPlainLength > maxCharsDesc ? 'red' : 'inherit' }">
                  {{ descPlainLength }} / {{ maxCharsDesc }} {{ $t('report.steps.1.characters') }}
                </p>
              </div>
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
              mode="advanced"
              :customUpload="true"
              :auto="true"
              :multiple="false"
              accept="image/png, image/jpeg"
              :maxFileSize="5 * 1024 * 1024"
              dragDrop
              @uploader="onUpload"
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
            <report-issue-card :border="true" :issue="formValuesToEntity(formValues)"></report-issue-card>
          </div>
          <div class="buttons">
            <pv-button :label="$t('report.steps.buttons.back')" severity="secondary" @click="activateCallback('2')" />
            <pv-button :label="$t('report.steps.buttons.submit')"  @click="submitReport"/>
          </div>
        </pv-step-panel>
    </pv-step-item>
  </pv-stepper>
</template>

<style scoped>

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
.formContainer {
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
  column-gap: 5vh;
  margin-left: 1vh;
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

.select-with-tooltip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.severity-info {
  color: #6b7280;
  cursor: pointer;
  font-size: 1rem;
  position: absolute;
  left: 102%;
}
.fieldWrapper {
  width: 100%;
}

.halfWidth {
  width: calc(50% - 2.5vh);
}

.formContainer {
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 2vh;
}
</style>