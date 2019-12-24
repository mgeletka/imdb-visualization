import Vue from 'vue'
import App from './App.vue'
import store from './store';
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";

Vue.use(SliderPlugin);

Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
