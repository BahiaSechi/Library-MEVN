import api from './api'

export default {
    getAll(params) {
        return api().get('users', {params});
    }
}