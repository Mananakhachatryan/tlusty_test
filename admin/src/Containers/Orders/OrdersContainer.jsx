import { connect } from 'react-redux';
import { getOrders, editOrder } from '../../Store/actions/orders';
import OrdersComponent from '../../Components/OrdersComponent/OrdersComponent';

const mapStateToProps = state => ({
    ordersReducer:state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
  getOrders: (payload, raw) => dispatch(getOrders(payload, raw)),
  editOrder: (id, data) => dispatch(editOrder(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
