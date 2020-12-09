import api from './api'
import Vue from "vue";


export default {
    getAll() {
        return api().get('loans', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    add(newBook) {
        return api().post('loans', newBook, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    remove(id) {
        return api().delete(`loans/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }
}