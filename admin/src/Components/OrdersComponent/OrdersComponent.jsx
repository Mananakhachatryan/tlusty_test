import React, { Component } from 'react';
import _ from 'lodash';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

class OrdersComponent extends Component {

    columns = [
        {
          name: 'Id',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'Title',
          selector: 'title',
          sortable: true,
        },
        {
          name: 'Short',
          selector: 'short',
          sortable: true,
        },
        {
          name: 'Promoted',
          selector: 'promoted',
          sortable: true,
        },
        {
          name: 'Description',
          selector: 'description',
          sortable: true,
        },
        {
          name: 'Items',
          selector: 'items',
          sortable: true,
        },
        {
          name: 'Created at',
          selector: 'createdAt',
          sortable: true,
        },
        {
          name: 'Updated at',
          selector: 'updatedAt',
          sortable: true,
        },
        {
          cell: (d) => <Link className="btn btn-view" to={`orders/view${d.id.replace('orders/', '')}`}>View</Link>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
        {
          cell: (d) => <Link className="btn btn-edit" to={`orders/edit${d.id.replace('orders/', '')}`}>Edit</Link>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
      ];

    view = (d) => {
        console.log(d)
    }

    componentWillMount(){
        this.props.getOrders()
    }

    render() {
        let data = _.map(this.props.ordersReducer.data['hydra:member'], (value, index) => {
            return {
                id: value['@id'], title: value.title, short: value.short, promoted: 'blaa', description: value.description,  items: 'items', createdAt: value.createdAt, updatedAt: value.updatedAt
            }
        });


        return  <div>
            <h1>Orders</h1>
            <Link className="btn" to="orders/create">Create Order</Link>
            <DataTable
            columns={this.columns}
            data={data}
            paginationServer={true}
        />
        </div>
    }
}
export default OrdersComponent;
