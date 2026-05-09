import axiosClient from "../axios/axiosClient";

const foodApi = {
  getAll(params) {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  getById(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/users';
    return axiosClient.post(url, data);
  }
};

export default foodApi;