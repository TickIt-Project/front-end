<script>

import {ref} from "vue";
import {Button as PvButton} from "primevue";

export default{
  name: "auth-form",
  components: {PvButton},
  props: {
    resolver: Function,
    fields: Array,
    onFormSubmit: Function,
    submitButton: String,
    slack_label: String
  }
}
</script>


<template>
    <div class="form" >
      <pv-form :resolver="resolver" @submit="onFormSubmit" class="formFields">
        <pv-form-field v-for="field in fields" :key="field.name" v-slot="$field" as="section" :name="field.name" :initialValue="field.initialValue" >
          <label :for="field.name">{{ field.label }}</label>
          <pv-input-text  v-if="field.type === 'text' || field.type === 'number'" :type="field.inputType" :placeholder="field.placeholder" fluid />
          <pv-password    v-if="field.type === 'password'" :type="field.inputType" :placeholder="field.placeholder" :feedback="false" toggleMask fluid />
          <pv-message     v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</pv-message>
        </pv-form-field>
        <div class="buttons">
        <pv-button class="button" type="submit" :label="submitButton" />
        <pv-button
            @click="$emit('slack-event')"
            severity="secondary">
          <img src="../../assets/slack.svg" alt="slack icon" style="width: 17px">
          <span>{{slack_label}}</span>
        </pv-button>
        </div>
      </pv-form>
    </div>
</template>

<style scoped>

.buttons{
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  width: 100%;
}

.button{
  display: flex;
  width: 100%;
  max-height: 40px;
}

.button p{
  margin: 0;
  padding: 0;
}

label{
  font-weight: 450;
  font-size: 15px;
  display: block;
  margin-bottom: 5px;
  color: var(--contrast-gray);
}

.formFields{
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
}

.form{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.form pv-input-text{
  width: 100%;
}
</style>