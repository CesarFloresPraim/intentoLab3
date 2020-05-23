import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080';

class ApiService {

    fetchItems() {
        return axios.get(USER_API_BASE_URL + '/getItems');
    }

    fetchItemOptions(itemId) {
        return axios.get(USER_API_BASE_URL + '/getItemOptions/' + itemId);
    }

    logUser(username, password) {
        let loginForm = {
            "username": username,
            "password": password
        }
        return axios.post(USER_API_BASE_URL + '/logUser', loginForm);
    }

    subPDF(file) {
        return axios.post(USER_API_BASE_URL + '/pdf', file);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new ApiService();