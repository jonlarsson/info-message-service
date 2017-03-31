// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";

const NotFound = { template: '<p>Page not found</p>' }
import ServiceList from "./components/ServiceList";
import Service from "./components/Service";

Vue.config.productionTip = false


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: ServiceList
    },
    {
      path: "/service/:serviceId",
      component: Service,
      name: "service",
      props: true
    }
  ]
});


/* eslint-disable no-new */
new Vue({
  router,
  template: `<div id="app"><router-view class="view"></router-view></div>`
}).$mount("#app");
