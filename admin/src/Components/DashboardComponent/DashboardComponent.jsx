import React, { Component } from 'react';
import _ from 'lodash';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import moment from 'moment';

class DashboardComponent extends Component {

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

    componentWillMount(){
        this.props.getOrders(5, '&order%5Bitems%5D=DESC')
    }

    render() {
        let data = _.map(this.props.ordersReducer.data['hydra:member'], (value, index) => {
            return {
                id: value['@id'], title: value.title, short: value.short, promoted: value.promoted.toString(), description: value.description,  items: value.items.map(i => <span key={i}>{i}</span>), createdAt: moment(value.createdAt).format('MM-DD-YYYY'), updatedAt: value.updatedAt ? moment(value.updatedAt).format('MM-DD-YYYY') : null
            }
        });


        return  <div>
            <h1>Dashboard</h1>
            <DataTable
            columns={this.columns}
            data={data}
            paginationServer={true}
        />
        </div>
    }
}
export default DashboardComponent;
