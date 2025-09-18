import api from './api';

const supplierApi = {
    getSupplies: (params) => api.get('/supplier/supplies', { params }),
    getSupply: (id) => api.get(`/supplier/supplies/${id}`),
    createSupply: (data) => api.post('/supplier/supplies', data),
    updateSupply: (id, data) => api.put(`/supplier/supplies/${id}`, data),
    cancelSupply: (id) => api.put(`/supplier/supplies/${id}/cancel`),
    getSupplyStats: () => api.get('/supplier/supplies/stats'),
};

export default supplierApi;
