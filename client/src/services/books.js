import api from './api'
import Vue from "vue";


export default {
    getAll() {
        return api().get('books', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    getById(bookId) {
        return api().get(`books/${bookId}`, {
            headers: {Authorization: "Bearer " + Vue.$cookies.get("token")}
        });
    },

    add(newBook) {
        return api().post('books', newBook, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    remove(id) {
        return api().delete(`books/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }
}