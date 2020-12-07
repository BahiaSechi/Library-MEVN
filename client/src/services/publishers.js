import api from './api'

export default {
    getAll() {
        return api().get('publishers');
    },

    add(newPublisher) {
        return api().post('publishers', newPublisher)
    },

    remove(id) {
        return api().delete(`publishers/${id}`);
    }

}
