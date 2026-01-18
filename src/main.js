
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import '@/style.css'

import i18n from "@/i18n.js";
import router from "./router/index.js";
import { createPinia } from 'pinia';

import 'primeicons/primeicons.css'

//components
import Menubar from 'primevue/menubar';
import {Form, FormField} from "@primevue/forms";
import {
    Avatar,
    Button,
    Card, Column, DataTable, DatePicker, Dialog, Fieldset,
    FileUpload,
    FloatLabel,
    Inplace,
    InputText,
    Message, MultiSelect,
    Password,
    Select,
    Tag, ToastService, Tooltip
} from "primevue";
import {definePreset} from "@primeuix/themes";

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Editor from "primevue/editor";


// Default App Instance
const app = createApp(App);

const pinia = createPinia();

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#BDDEFF',
            100: '#85B2DE',
            200: '#6494C5',
            300: '#638AB1',
            400: '#436B93',
            500: '#405F7F',
            600: '#2b4b67',
            700: '#3E4F61',
            800: '#2b3847',
            900: '#202C38',
            950: '#0D1217'
        }
    }
});

app.use(PrimeVue, { theme: {
        preset: MyPreset,
        ripple: true,

    }})
    .component('pv-menubar', Menubar)
    .component('pv-form', Form)
    .component('pv-form-field',FormField)
    .component('pv-input-text',InputText)
    .component('pv-message', Message)
    .component('pv-password', Password)
    .component('pv-button',Button)
    .component('pv-avatar', Avatar)
    .component('pv-stepper',Stepper)
    .component('pv-step-list',StepList)
    .component('pv-step-panels', StepPanels)
    .component('pv-step-item', StepItem)
    .component('pv-step', Step)
    .component('pv-step-panel', StepPanel)
    .component('pv-card', Card)
    .component('pv-select', Select)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label',FloatLabel)
    .component('pv-editor',Editor)
    .component('pv-tag', Tag)
    .component('pv-inplace', Inplace)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-input', InputText)
    .component('pv-date-picker', DatePicker)
    .component('pv-multi-select',MultiSelect)
    .component('pv-dialog', Dialog)
    .component('pv-fieldset', Fieldset)

    .directive('pv-tooltip', Tooltip)




// Vue Router
app.use(router);

// Vue i18n
app.use(i18n);

//ToastService
app.use(ToastService);

// Mount App
app.mount('#app');
