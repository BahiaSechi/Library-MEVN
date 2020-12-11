import api from './api'
import Vue from "vue";

export default {
    getAll() {
        return api().get('users', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    getById(userId) {
        return api().get(`users/${userId}`, {
            headers: {Authorization: "Bearer " + Vue.$cookies.get("token")}
        });
    },

    register(newUser) {
        return api().post('users/register', newUser)
    },

    addUser(newUser) {
        return api().post('users', newUser, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    login(user) {
        return api().post('users/login', user)
    },

    remove(id) {
        return api().delete(`users/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }
}
