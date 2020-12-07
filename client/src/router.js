import VueRouter from "vue-router";
import Authors from "@/views/Authors";
import Publishers from "@/views/Publishers";

export default () => {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {path: '/authors', component: Authors},
            {path: '/publishers', component: Publishers},
            {path: '/about', component: Authors},
            {path: '/contact', component: Authors}
        ]
    });
    return router;
}