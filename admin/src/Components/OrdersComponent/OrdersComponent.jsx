import React, { Component } from 'react';
import _ from 'lodash';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './OrdersComponent.css';
import Filters from './Filters/Filters';

class OrdersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            showItem: false,
            showMoreItem: false,
            fitlers: {
                from: null,
                to: null,
                promoted: null
            }
        }
    }

    changeItem = (d, value, key) => {
        if (d.createdAt) {
            d.createdAt = moment(d.createdAt, 'MM-DD-YYYY').toDate().toISOString();
        }
        if (d.updatedAt) {
            d.updatedAt = moment(d.updatedAt, 'MM-DD-YYYY').toDate().toISOString();
        } else {
            delete d.updatedAt
        }
        d[key] = value;

        let stateData = { ...this.state.data};
        let index = stateData['hydra:member'].findIndex((i) => {
            return i['@id'] == d.id;
        });
        stateData['hydra:member'][index][key] = value;
        this.setState({ data: stateData }, () => {
            this.props.editOrder(d.id.replace('/orders/', ''), d);
        });
    }

    changeTitle = (key, value) => {
        let data = {... this.state.data};
        data[key] = value;
        this.setState({ data })
    }

    columns = [
        {
          name: 'Id',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'Title',
          selector: 'title',
          // sortable: true,
          cell: (d) => <div> <input className="table-input" type="text" value={d.title} onChange={(e) => this.changeItem(d, e.target.value, 'title') }/> </div>
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
            cell: (d) => <div className="item-block">
                <label className="switch">
                    <input
                        type="checkbox"
                        onChange={(e) => this.changeItem(d, e.target.checked, 'promoted')}
                        checked={d.promoted}
                    />
                    <a className="slider round"></a>
                </label>
            </div>

        },
        {
          name: 'Description',
          selector: 'description',
          sortable: true,
          cell: (d) => <div> <input className="table-input" type="text" value={d.description} onChange={(e) => this.changeItem(d, e.target.value, 'description') }/> </div>
        },
        {
          name: 'Items',
          sortable: true,
            cell: (d) => <div>
                <p className={ _.isEmpty(d.items) ? "drop-down empty" : "drop-down"} onClick={ (e) => this.createItemDropDown(d)}>Items <img src="https://image.flaticon.com/icons/svg/60/60995.svg"/> </p>
                { ( (this.state.showItem === d.id) && !_.isEmpty(d.items) ) && (
                    <ul className="items-dropDown">
                        { _.map(d.items, (value, index) => {
                            if(index < 5){
                                return  <li key={index}>{value.key}</li>
                            }else if(this.state.showMoreItem === d.id){
                                return  <li key={index}>{value.key}</li>
                            }
                        })}

                        { (d.items.length > 5 && !this.state.showMoreItem )&& <li onClick={ (e) => this.showMoreItems(d)} > More </li>}

                    </ul>
                )}

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,

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
            cell: (d) => <Link className="btn btn-edit" to={`order/create-item${d.id.replace('orders/', '')}`}>Create Item</Link>,
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

    createItemDropDown = d => {
        if(!this.state.showItem){
            this.setState({ showItem : d.id, showMoreItem: false});
        }else{
            this.setState({ showItem : false, showMoreItem: false});
        }

    }

    showMoreItems = d => {
        this.setState({ showMoreItem : d.id, });
    }

    componentDidMount(){
        this.props.getOrders()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ordersReducer.data && Object.keys(nextProps.ordersReducer.data).length > 0 && Object.keys(prevState.data).length === 0) {
          return ({ data: nextProps.ordersReducer.data });
        } else {
            return ({})
        }
    }

    filterData = (type, data) => {
        let filters = { ...this.state.filters};
        filters[type] = data;
        let sendRow = '';
        _.forEach(filters, (value, key) => {
            if (value && key === 'promoted') {
                sendRow += `promoted=<${value}>&`
            }
            if (value && key === 'from') {
                sendRow += `createdAt[<gt>]=${value}&`
            }
            if (value && key === 'to') {
                sendRow += `createdAt[<lt>]=${value}&`
            }
        });
        this.setState({
            filters
        }, () => {
            this.props.getOrders(30, sendRow);
        })
    }

    render() {
        let data = _.map(this.state.data['hydra:member'], (value, index) => {
            return {
                id: value['@id'],
                title: value.title,
                short: value.short,
                promoted: value.promoted,
                description: value.description,
                items: value.items.map(i => <span key={i}>{i}</span>),
                createdAt: moment(value.createdAt).format('MM-DD-YYYY'),
                updatedAt: value.updatedAt ? moment(value.updatedAt).format('MM-DD-YYYY') : null
            }
        });


        return  <div>
            <h1>Orders</h1>
            <Link className="btn" to="orders/create">Create Order</Link>
            <Filters onChange={this.filterData} />
            <DataTable
            columns={this.columns}
            data={data}
            paginationServer={true}
        />
        </div>
    }
}
export default OrdersComponent;
