import HttpService from '../../Shared/HttpService/HttpsService';
import { ORDERS_TABLE, ORDER_VIEW, ORDER_CREATE, ORDER_EDIT, ORDER_DELETE, ORDER_CREATE_ITEM } from '../constants/orders';

export const getOrders = (count = 30, order) => {
  return HttpService('GET', null, `orders?${order ? order : ''}page=1&itemsPerPage=${count} `, ORDERS_TABLE);
};

export const createOrder = (data) => {
    return HttpService('POST', null, 'orders', ORDER_CREATE, data);
};

export const createOrderItem = (data) => {
    return HttpService('POST', null, 'order_items', ORDER_CREATE_ITEM, data);
};

export const getOrder = (id) => {
    return HttpService('GET', null, `orders/${id}`, ORDER_VIEW);
};

export const editOrder = (id, data) => {
    // debugger
    return HttpService('PUT', null, `orders/${id}`, ORDER_EDIT, data);
};

export const deleteOrder = (id) => {
    return HttpService('DELETE', null, `orders/${id}`, ORDER_DELETE);
};
