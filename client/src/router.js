import VueRouter from "vue-router";
import Authors from "@/views/Authors";

export default () => {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {path: '/authors', component: Authors},
            {path: '/about', component: Authors},
            {path: '/contact', component: Authors}
        ]
    });
    return router;
}