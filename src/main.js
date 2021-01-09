import axios from "axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
// Vue
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
// Components
import AddCollaborator from "./components/AddCollaborator.vue";

Vue.use(Buefy);
Vue.use(VueRouter);

Vue.config.productionTip = false;

/**
 * I will create "hidden" routes with three parameters
 * - the owner of the repo (me)
 * - the repo name I want the user to be added to (this will be validated server-side)
 * - a secret (this will also be validated server side)
 */
const routes = [
  { path: "/private-repos/:owner/:repo/:secret", component: AddCollaborator },
];

const router = new VueRouter({
  routes,
});

/** Global variables */

/**
 * Exposing the api in a global variable.
 * Currently only one method required.
 * If this app grew, this could be moved to a separate file.
 */
Vue.prototype.$api = {
  createCollaborator(data) {
    return axios.post("/api/add-collaborator", data);
  },
};

/**
 * Construct Vue instance
 */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
