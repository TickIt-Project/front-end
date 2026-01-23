<script>
import { IssueReportService } from '@/shared/services/report-api.service.js'
import {FileUpload as PvFileUpload, Select as PvSelect, Tag as PvTag} from "primevue";
import {FormField as PvFormField} from "@primevue/forms";
import {severityConfig} from "@/shared/services/severity-configurations.js";
import ReportIssueCard from "@/shared/components/report-issue-card.component.vue";
import {IssueReportAssembler} from "@/shared/services/report-assembler.js";


export default {
  name: "full-stepper",
  components: {ReportIssueCard, PvTag, PvFormField, PvFileUpload, PvSelect},
  data() {
    return {
      formValues: {
        title: '',
        description: '',
        url: '',
        severity: {},
        screenResolved: null,
      },
      //todo change url to service
      uploadUrl: 'https://httpbin.org/post',
      value: '',
      maxCharsDesc: 3000,
      maxCharsTitle: 100,
      reportService: new IssueReportService(),
      reportAssembler: new IssueReportAssembler(),
      /**
       * @property {Array<Object>} fields
       * @description Defines the structure of form fields to be rendered dynamically
       */
      fields: [
        { name: 'title',       label: this.$t('report.steps.1.fields.title'),          type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.title'), initialValue: '' },
        { name: 'description',label: this.$t('report.steps.1.fields.description'),    type: 'editor', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.description'), initialValue: '' },
        { name: 'url',        label: this.$t('report.steps.1.fields.url'),            type: 'text', inputType: 'text',  placeholder: this.$t('report.steps.1.fields.url'), initialValue: '' },
        { name: 'severity',        label: this.$t('report.steps.1.fields.severity'),   type: 'select', inputType: 'select',  placeholder: this.$t('report.steps.1.fields.severity'), initialValue: '', editable: false, options:[] },
      ]
    }
  },
  mounted(){
    Promise.all([
      this.reportService.getSeverityOptions(),
    ])
        .then(([severityRes]) => {
          // severity
          const severityField = this.fields.find(f => f.name === 'severity');
          if (severityField && Array.isArray(severityRes.data)) {
            severityField.options = severityRes.data.map(sev => ({
              label: this.$t(`status.${sev}`),
              value: sev
            }));
          }
        });
  },
  methods: {
    formValuesToEntity(formValues) {
      let report = this.reportAssembler.EntityFromResponse({
        id : null,
        companyId : null,
        title : formValues.title,
        description : formValues.description,
        screen : this.screenResolved,
        url: formValues.url,
        companyRole : "Advisor",
        severity : formValues.severity.value,
        imgUrl : 'https://preview.redd.it/pls-gib-to-me-facts-lore-about-miku-v0-sfbyk901c82d1.jpeg',
        status : null,
        reporter : null,
        assignee : null,
        resolvedAt : null,
        submittedAt : null,
        ticketOption : false}
    );
      console.log(formValues);
      console.log(report);
      return report;
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
            <div class="formContainer" v-for="field in fields" :key="field.name">
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

                <p :style="{ color: descPlainLength > maxCharsDesc ? 'red' : 'inherit' }">
                  {{ descPlainLength }} / {{ maxCharsDesc }} {{ $t('report.steps.1.characters') }}
                </p>
              </div>

              <pv-float-label v-if="field.type === 'select'" variant="on">
                <!-- Wrapper para select + icon -->
                <div class="select-with-tooltip">
                  <pv-select
                      v-model="formValues[field.name]"
                      :editable="field.editable"
                      class="select"
                      :options="field.options"
                      optionLabel="label"
                      :inputId="field.name"
                  />

                  <!-- Icono SOLO para severity -->
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
            <report-issue-card :border="true" :issue="formValuesToEntity(formValues)"></report-issue-card>
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
</style>