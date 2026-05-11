import axiosClient from '../axios/axiosClient';

const orderHistoryApi = {
  getHistory: (userId) => {
    const url = `/orders/${userId}`; 
    return axiosClient.get(url);
  }
};

export default orderHistoryApi;