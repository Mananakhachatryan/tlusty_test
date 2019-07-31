import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class OrderCreateItemComponent extends Component {

    state = {
        data: {
            order: `/orders/${this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1]}`,
        }
    }

    columns = [
        {
          name: 'Content',
          selector: 'content',
          required: true,
          type: 'text',
        },
        {
          name: 'Description',
          selector: 'description',
          type: 'text',
        },
        {
          name: 'Order',
          selector: 'order',
          type: 'text',
          disabled: true
        },
        {
          name: 'Price',
          selector: 'price',
          type: 'number',
        }
    ];

    changeItem = (key, value) => {
        let data = {... this.state.data};
        data[key] = value;
        this.setState({ data })
    }

    createOrder = () => {

        let orderId = '/orders/'+this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1]

        const data = {
            ...this.state.data,
            order: orderId,
            // updatedAt: moment(this.state.data.updatedAt, 'YYYY-MM-DD').toDate().toISOString()
        };
        this.props.createOrderItem(data);
    }

    render() {

        console.log(this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1])



        if (this.props.ordersReducer.redirectSuccess) {
            return <Redirect to='/' />
        }
        return  <div>
            <h1>Order Item Create</h1>
            {this.columns.map((item) => {
                return <div className="item-block" key={item.selector}>
                    <label>{item.name}</label>
                    {item.type === 'text' && <input disabled={item.disabled} type="text" value={this.state.data[item.selector]} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
                    {item.type === 'number' && <input disabled={item.disabled} type="number" value={this.state.data[item.selector]} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
                    {item.type === 'date' && <input disabled={item.disabled} type="date" value={this.state.data[item.selector] && moment(this.state.data[item.selector]).format('YYYY-MM-DD')} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
                    {item.type === 'radio' && <label className="switch">
                        <input type="checkbox" onChange={(e) => this.changeItem(item.selector, !this.state.data[item.selector])} checked={this.state.data[item.selector]} />
                        <a className="slider round"></a>
                    </label>}
                    {item.type === 'selectMultiple' && <select multiple>
                        {this.state.data[item.selector] && this.state.data[item.selector].map(i => <option key={i} selected>{i}</option>)}
                    </select>}
                </div>
            })}
            <button onClick={this.createOrder} disabled={!this.state.data}>Create Order Item</button>
        </div>
    }
}
export default withRouter(OrderCreateItemComponent);
