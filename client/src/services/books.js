import api from './api'

export default {
    getAll() {
        return api().get('books');
    },

    add(newBook) {
        return api().post('books', newBook)
    },

    remove(id) {
        return api().delete(`books/${id}`);
    }
}