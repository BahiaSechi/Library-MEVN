import api from './api'

export default {
    getAll() {
        return api().get('users');
    },

    register(newUser) {
        return api().post('users/register', newUser)
    },

    login(user) {
        return api().post('users/login', user)
    },

    remove(id) {
        return api().delete(`users/${id}`);
    }

}
