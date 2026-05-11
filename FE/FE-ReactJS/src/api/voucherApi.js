import axiosClient from '../axios/axiosClient';

const voucherApi = {
  getAllVouchers: () => {
    return axiosClient.get('/vouchers/'); 
  },
  getById(id) {
    const url = `/vouchers/${id}`;
    return axiosClient.get(url);
  },
};

export default voucherApi;