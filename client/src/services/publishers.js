import api from './api'
import Vue from "vue";


export default {
    getAll() {
        return api().get('publishers', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },

    getById(publisherId) {
        return api().get(`publishers/${publisherId}`, {
            headers: {Authorization: "Bearer " + Vue.$cookies.get("token")}
        });
    },

    add(newPublisher) {
        return api().post('publishers', newPublisher, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    remove(id) {
        return api().delete(`publishers/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }

}
