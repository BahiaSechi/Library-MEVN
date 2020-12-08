import VueRouter from "vue-router";
import Authors from "@/views/Authors";
import Publishers from "@/views/Publishers";
import Users from "@/views/Users";
import Books from "@/views/Books";

export default () => {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {path: '/authors', component: Authors},
            {path: '/publishers', component: Publishers},
            {path: '/users', component: Users},
            {path: '/books', component: Books}
        ]
    });
    return router;
}