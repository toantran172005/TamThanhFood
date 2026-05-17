import axiosClient from "../axios/axiosClient";

const userApi = {

    login(email, password){
        const url = '/user/login';
        return axiosClient.post(url, { email, password });
    },
    getUserDetails(userId) {
        const url = `/user/details/${userId}`;
        return axiosClient.get(url);
    },
    updateUser(data){
        const url = '/user/update';
        return axiosClient.post(url, data);
    },
    register: (data) => {
    const url = '/user/register'; 
    return axiosClient.post(url, data);
  }
};

export default userApi;