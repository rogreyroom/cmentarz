import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VueKonva from 'vue-konva'
import Print from 'vue-print-nb'
import App from './App'
import router from './router'
import db from './server/database'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vue2Filters)
Vue.use(Print)
Vue.use(VueKonva)

Vue.prototype.$db = db

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
