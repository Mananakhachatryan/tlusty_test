import { connect } from 'react-redux';
import { editOrder, getOrder, deleteOrder } from '../../../Store/actions/orders';
import OrderEditComponent from '../../../Components/OrdersComponent/OrderEditComponent/OrderEditComponent';

const mapStateToProps = state => ({
    ordersReducer:state.ordersReducer,
});

const mapDispatchToProps = dispatch => ({
  getOrder: payload => dispatch(getOrder(payload)),
  editOrder: (id, data) => dispatch(editOrder(id, data)),
  deleteOrder: payload => dispatch(deleteOrder(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditComponent);
