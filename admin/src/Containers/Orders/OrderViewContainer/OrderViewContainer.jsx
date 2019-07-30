import { connect } from 'react-redux';
import { getOrder } from '../../../Store/actions/orders';

import OrderViewComponent from '../../../Components/OrdersComponent/OrderViewComponent/OrderViewComponent';

const mapStateToProps = state => ({
    ordersReducer: state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
    getOrder: payload => dispatch(getOrder(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderViewComponent);
