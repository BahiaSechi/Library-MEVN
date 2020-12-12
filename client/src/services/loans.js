import api from './api'
import Vue from "vue";


export default {
    getAll() {
        return api().get('loans', {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    },
    add(newLoan) {
        return api().post('loans', newLoan, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    return(id) {
        return api().post(`loans/${id}/return`, {},  {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        })
    },

    remove(id) {
        return api().delete(`loans/${id}`, {
            headers: { Authorization: "Bearer " + Vue.$cookies.get("token") }
        });
    }
}