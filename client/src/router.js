import VueRouter from "vue-router";
import Authors from "@/views/Authors";
import Publishers from "@/views/Publishers";
import Users from "@/views/Users";
import Books from "@/views/Books";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Home from "@/views/Home";

export default () => {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {path: '/', component: Home},
            {path: '/authors', component: Authors},
            {path: '/publishers', component: Publishers},
            {path:'/login', component: Login},
            {path:'/register', component: Register},
            {path: '/users', component: Users},
            {path: '/books', component: Books}
        ]
    });
    return router;
}