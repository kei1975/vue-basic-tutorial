import Vue from 'vue'
import App from './App.vue'
import VeeValidate, { Validator } from 'vee-validate'
// vee-validateの日本語ファイルを読み込み
import ja from 'vee-validate/dist/locale/ja'

import router from './router'

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
