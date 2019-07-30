import HttpService from '../../Shared/HttpService/HttpsService';
import { ORDERS_TABLE, ORDER_VIEW, ORDER_CREATE, ORDER_EDIT, ORDER_DELETE } from '../constants/orders';

export const getOrders = () => {
  return HttpService('GET', null, 'orders?order%5Bid%5D=DESC&page=1&perPage=30', ORDERS_TABLE);
};

export const createOrder = (data) => {
    return HttpService('POST', null, 'orders', ORDER_CREATE, data);
};

export const getOrder = (id) => {
    return HttpService('GET', null, `orders/${id}`, ORDER_VIEW);
};

export const editOrder = (id, data) => {
    return HttpService('PUT', null, `orders/${id}`, ORDER_EDIT, data);
};

export const deleteOrder = (id) => {
    return HttpService('DELETE', null, `orders/${id}`, ORDER_DELETE);
};
