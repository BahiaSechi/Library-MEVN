import api from './api'
import Vue from "vue";

export default {
    getAll() {
        return api().get('authors', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    getById(authorId) {
        return api().get(`authors/${authorId}`, {
            headers: {Authorization: "Bearer " + Vue.$cookies.get("token")}
        });
    },

    add(newAuthor) {
        return api().post('authors', newAuthor, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    remove(id) {
        return api().delete(`authors/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }
}