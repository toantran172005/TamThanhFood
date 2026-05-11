import axiosClient from "../axios/axiosClient";

const userApi = {

    login(email, password){
        const url = '/user/login';
        return axiosClient.post(url, { email, password });
    },
    getUserDetails(userId) {
        const url = `/user/details/${userId}`;
        return axiosClient.get(url);
    }
};

export default userApi;