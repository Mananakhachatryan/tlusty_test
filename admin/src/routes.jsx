import OrdersContainer from './Containers/Orders/OrdersContainer';
import OrderViewContainer from './Containers/Orders/OrderViewContainer/OrderViewContainer';
import OrderCreateContainer from './Containers/Orders/OrderCreateContainer/OrderCreateContainer';
import OrderEditContainer from './Containers/Orders/OrderEditContainer/OrderEditContainer';

import OrderCreateItemContainer from './Containers/Orders/OrderCreateItemContainer/OrderCreateItemContainer';

import DashboardContainer from './Containers/Dashboard/DashboardContainer';

import OldExample from './Containers/OldExample/OldExample';

export const Routes = [
  {
    isExact: true,
    path: '/',
    name: 'Orders',
    component: OrdersContainer,
  },
  {
    isExact: true,
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardContainer,
  },
  {
    isExact: true,
    path: '/orders/view/:id',
    name: 'Order View',
    component: OrderViewContainer,
  },
  {
    isExact: true,
    path: '/orders/create',
    name: 'Order Create',
    component: OrderCreateContainer,
  },
  {
    isExact: true,
    path: '/order/create-item/:id',
    name: 'Order Create',
    component: OrderCreateItemContainer,
  },
  {
    isExact: true,
    path: '/orders/edit/:id',
    name: 'Order Edit',
    component: OrderEditContainer,
  },
  {
    isExact: true,
    path: '/old',
    name: 'Old',
    component: OldExample,
  }
];
