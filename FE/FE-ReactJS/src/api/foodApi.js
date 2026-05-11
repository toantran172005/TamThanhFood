import axiosClient from '../axios/axiosClient';

const foodApi = {
  getAll(params) {
    const url = '/foods';
    return axiosClient.get(url, { params });
  },
  getById(id) {
    const url = `/foods/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/foods';
    return axiosClient.post(url, data);
  }
};

export default foodApi;