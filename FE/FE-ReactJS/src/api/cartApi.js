import axiosClient from '../axios/axiosClient';

const cartApi = {
    getCartByUserId: (userId) => axiosClient.get(`/cart/${userId}`),

    updateQuantity: (payload) => axiosClient.put('/cart/update', payload),

    removeFromCart: (userId, foodId) => axiosClient.delete(`/cart/delete/${userId}/${foodId}`),

    addToCart: (payload) => axiosClient.post('/cart/add', payload)
};

export default cartApi;