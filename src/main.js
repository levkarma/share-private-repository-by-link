import Vue from "vue";
import VueRouter from "vue-router";
import AddCollaborator from "./components/AddCollaborator.vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";

Vue.use(Buefy);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: "/private-repos/:owner/:repo/:secret", component: AddCollaborator },
];

const router = new VueRouter({
  routes,
});

/**
 * Global variables
 */
Vue.prototype.$api = {
  createCollaborator(data) {
    return axios.post("/api/add-collaborator", data);
  },
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
