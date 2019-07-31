import { connect } from 'react-redux';
import { createOrderItem } from '../../../Store/actions/orders';
import OrderCreateItemComponent from '../../../Components/OrdersComponent/OrderCreateItemComponent/OrderCreateItemComponent';

const mapStateToProps = state => ({
    ordersReducer: state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
    createOrderItem: payload => dispatch(createOrderItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateItemComponent);
