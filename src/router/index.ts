import type {RouteRecordRaw} from "vue-router";
import Recognition from "@/components/Recognition.vue";
import ChartSample from "@/components/ChartSample.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes :Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"home",
        component:Recognition
    },
    {
        path:"/chart",
        name:"chart",
        component:ChartSample
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router