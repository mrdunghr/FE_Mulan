import axios from 'axios';
import {BASE_URL} from '../constants';

export const login = (username, password) => {
    const data = {
        username: username,
        password: password,
    };

    return axios.post(BASE_URL + '/api/v1/customers/login', data);
};

export const checkThePermissionToUseTheKey = (idKey) => {
    const token = localStorage.getItem('token');

    // Tạo một đối tượng cấu hình Axios với tiêu đề 'Authorization' chứa token
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    return axios.get(BASE_URL + `/api/v1/customers/permission-key?idKey=${idKey}`, axiosConfig)
        .then((response) => {
            // Xử lý kết quả trả về từ API ở đây
            return response.data; // Trả về giá trị Boolean từ API
        })
        .catch((error) => {
            // Xử lý lỗi ở đây
            console.error(error);
            throw error; // Ném lỗi để xử lý ở phần gọi hàm
        });
}

export const register = (username, password, email, phone) => {
    const data = {
        "username": username,
        "password": password,
        "email": email,
        "phone": phone,
    }
    return axios.post(BASE_URL + `/api/v1/customers/register`, data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            // Xử lý lỗi ở đây
            console.error(error);
            throw error; // Ném lỗi để xử lý ở phần gọi hàm
        });
}