import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class OrderEditComponent extends Component {

    state = {
        data: null
    }

    columns = [
        {
          name: 'Id',
          selector: 'id',
          disabled: true,
          type: 'text'
        },
        {
          name: 'Title',
          selector: 'title',
          required: true,
          type: 'text'
        },
        {
          name: 'Short',
          selector: 'short',
          type: 'text'
        },
        {
          name: 'Promoted',
          selector: 'promoted',
          type: 'radio'
        },
        {
          name: 'Description',
          selector: 'description',
          type: 'text'
        },
        {
          name: 'Items',
          selector: 'items',
          type: 'selectMultiple'
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

    changeItem = (key, value) => {
        let data = {... this.state.data};
        data[key] = value;
        this.setState({ data })
    }

    editOrder = () => {
        const id = this.props.match.params.id;
        const data = {
            ...this.state.data,
            createdAt: moment(this.state.data.createdAt, 'YYYY-MM-DD').toDate().toISOString(),
            updatedAt: moment(this.state.data.updatedAt, 'YYYY-MM-DD').toDate().toISOString()
        };
        this.props.editOrder(id, data);
    }

    deleteOrder = () => {
        const id = this.props.match.params.id;
        this.props.deleteOrder(id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ordersReducer.orderView && Object.keys(nextProps.ordersReducer.orderView).length > 0 && !prevState.data) {
          return ({ data: nextProps.ordersReducer.orderView });
        } else {
            return ({})
        }
    }

    render() {
        if (this.props.ordersReducer.redirectSuccess) {
            return <Redirect to='/' />
        }
        return  <div>
            <h1>Order Edit</h1>
            {this.state.data && this.columns.map((item) => {
                return <div className="item-block" key={item.selector}>
                    <label>{item.name}</label>
                    {item.type === 'text' && <input disabled={item.disabled} type="text" value={this.state.data[item.selector]} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
                    {item.type === 'date' && <input disabled={item.disabled} type="date" value={moment(this.state.data[item.selector]).format('YYYY-MM-DD')} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
                    {item.type === 'radio' && <label className="switch">
                        <input type="checkbox" onChange={(e) => this.changeItem(item.selector, !this.state.data[item.selector])} checked={this.state.data[item.selector]} />
                        <a className="slider round"></a>
                    </label>}
                    {item.type === 'selectMultiple' && <select multiple>
                        {this.state.data[item.selector].map(i => <option key={i} selected>{i}</option>)}
                    </select>}
                </div>
            })}
            <button className='btn' onClick={this.editOrder} disabled={!this.state.data}>Edit Form</button>
            <button className='btn btn-danger' onClick={this.deleteOrder} disabled={!this.state.data}>Delete Order</button>
        </div>
    }
}
export default withRouter(OrderEditComponent);
