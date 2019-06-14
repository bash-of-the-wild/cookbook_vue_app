import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = "https://secure-bayou-52007.herokuapp.com";
  // process.env.NODE_ENV === "development" ? "https://secure-bayou-52007.herokuapp.com" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
