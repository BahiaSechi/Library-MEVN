import axios from 'axios'
 export default () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
     return instance;
 }