import axiosClient from '../axios/axiosClient';

const orderApi = {
  getHistory(userId) {
    return axiosClient.get(`/orders/history/${userId}`);
  },

  getById(orderId) {
    return axiosClient.get(`/orders/${orderId}`);
  },

  createOrder(data) {
    return axiosClient.post('/orders/create', data);
  },

  updateStatus(orderId, status) {
    return axiosClient.put(`/orders/${orderId}/status`, { status });
  },

  cancelOrder(userId, orderId) {
    return axiosClient.post(`/orders/canceledOrder/${userId}/${orderId}`);
  }
};

export default orderApi;