import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";

export default () => {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {path: '/', component: HelloWorld},
            {path: '/about', component: HelloWorld},
            {path: '/contact', component: HelloWorld}
        ]
    });
    return router;
}