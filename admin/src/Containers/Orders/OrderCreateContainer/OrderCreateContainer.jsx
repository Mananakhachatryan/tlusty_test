import { connect } from 'react-redux';
import { createOrder } from '../../../Store/actions/orders';
import OrderCreateComponent from '../../../Components/OrdersComponent/OrderCreateComponent/OrderCreateComponent';

const mapStateToProps = state => ({
    ordersReducer: state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
    createOrder: payload => dispatch(createOrder(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateComponent);
