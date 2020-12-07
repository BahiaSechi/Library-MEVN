import api from './api'

export default {
    getAll() {
        return api().get('authors');
    },

    add(newAuthor) {
        return api().post('authors', newAuthor)
    },

    remove(id) {
        return api().delete(`authors/${id}`);
    }
}