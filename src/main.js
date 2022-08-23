import Vue from 'vue'
import App from './App.vue'
import ElementUI, { MessageBox, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from 'axios'
import '@/api/mock.js'
import store from '@/store/index.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', this.$router)
  }
}).$mount('#app')
