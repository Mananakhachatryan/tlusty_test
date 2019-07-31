import { connect } from 'react-redux';
import { getOrders } from '../../Store/actions/orders';
import DashboardComponent from '../../Components/DashboardComponent/DashboardComponent';

const mapStateToProps = state => ({
    ordersReducer:state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
  getOrders: payload => dispatch(getOrders(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
