import { ORDERS_TABLE, ORDER_VIEW, ORDER_CREATE, ORDER_EDIT, ORDER_DELETE } from '../constants/orders';

const initialState = {
    data: [],
    pending: false,
    success: false,
    error: null,
    orderView: null,
    redirectSuccess: false,
};

const autoCompleteReducer = (
  state = initialState,
  { type, payload, error }
) => {
  switch (type) {
    case ORDERS_TABLE.PENDING:
      return {
        ...state,
        orderView: null,
        redirectSuccess: false,
        pending: true,
        success: false,
      };
    case ORDERS_TABLE.SUCCESS:
      return {
        ...state,
        data: payload,
        success: true,
        pending: false,
      };
    case ORDERS_TABLE.ERROR:
      return {
        ...state,
        success: true,
        pending: false,
        error,
      };
    case ORDER_VIEW.PENDING:
        return {
            ...state,
            orderView: null,
            pending: true,
            success: false,
        };
    case ORDER_VIEW.SUCCESS:
        return {
            ...state,
            orderView: payload,
            success: true,
            pending: false,
        };
    case ORDER_VIEW.ERROR:
        return {
            ...state,
            success: true,
            pending: false,
            error,
        };
    case ORDER_CREATE.PENDING:
        return {
            ...state,
            redirectSuccess: false,
            pending: true,
            success: false,
        };
    case ORDER_CREATE.SUCCESS:
        return {
            ...state,
            redirectSuccess: true,
            success: true,
            pending: false,
        };
    case ORDER_CREATE.ERROR:
        return {
            ...state,
            success: true,
            pending: false,
            error,
        };
    case ORDER_EDIT.PENDING:
        return {
            ...state,
            redirectSuccess: false,
            pending: true,
            success: false,
        };
    case ORDER_EDIT.SUCCESS:
        return {
            ...state,
            redirectSuccess: true,
            success: true,
            pending: false,
        };
    case ORDER_EDIT.ERROR:
        return {
            ...state,
            success: true,
            pending: false,
            error,
        };
    case ORDER_DELETE.PENDING:
        return {
            ...state,
            redirectSuccess: false,
            pending: true,
            success: false,
        };
    case ORDER_DELETE.SUCCESS:
        return {
            ...state,
            redirectSuccess: true,
            success: true,
            pending: false,
        };
    case ORDER_DELETE.ERROR:
        return {
            ...state,
            success: true,
            pending: false,
            error,
        };
    default:
        return state;
  }
};
export default autoCompleteReducer;
