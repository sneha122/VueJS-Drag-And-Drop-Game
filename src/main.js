import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VuePreloaders from 'vue-preloaders'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VuePreloaders, {
  options: {
    loaders: {
      myAwesomeLoader: {
        container: '#app',
        cssStyle: { backgroundColor: 'pink' },
        overlayStyle: { opacity: 1 }
      }
    }
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
