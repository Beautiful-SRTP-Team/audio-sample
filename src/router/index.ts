import type { RouteRecordRaw } from "vue-router";
import Recognition from "@/components/Recognition.vue";
import ChartSample from "@/components/ChartSample.vue";
import UserPage from "@/components/UserPage.vue";
import Blackbord from "@/components/Blackbord.vue";
import AudioExample from "@/components/AudioExample.vue"
import { createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Recognition,
  },
  {
    path: "/chart",
    name: "chart",
    component: ChartSample,
  },
  {
    path: "/user",
    name: "user",
    component: UserPage,
  }, {
    path: "/quiz",
    name: "quiz",
    component: Blackbord
  },{
    path:"/sample",
    name:"sample",
    component:AudioExample
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
