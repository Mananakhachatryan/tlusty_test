import React, { Component } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';


class OrderViewComponent extends Component {

    columns = [
        {
          name: 'Id',
          selector: 'id',
        },
        {
          name: 'Title',
          selector: 'title',
        },
        {
          name: 'Short',
          selector: 'short',
        },
        {
          name: 'Promoted',
          selector: 'promoted',
        },
        {
          name: 'Description',
          selector: 'description',
        },
        {
          name: 'Items',
          selector: 'items',
        },
        {
          name: 'Created at',
          selector: 'createdAt',
          type: 'date'
        },
        {
          name: 'Updated at',
          selector: 'updatedAt',
          type: 'date'
        }
    ];

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.getOrder(id);
    }

    render() {
        return  <div>
            <h1>Order View</h1>
            {this.props.ordersReducer.orderView && this.columns.map((item) => {
                let value = this.props.ordersReducer.orderView[item.selector];
                if (item.selector === 'promoted') {
                    value = value ? 'true' : 'false'
                }
                return <div className="item-block">
                    <label>{item.name}</label>
                    <span>{item.type === 'date' ? moment(value).format('MM-DD-YYYY') : value}</span>
                </div>
            })}
        </div>
    }
}
export default withRouter(OrderViewComponent);
