import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class OrderCreateComponent extends Component {

    state = {
        data: {}
    }

    columns = [
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

    changeItem = (key, value) => {
        let data = {... this.state.data};
        data[key] = value;
        this.setState({ data })
    }

    createOrder = () => {
        const data = {
            ...this.state.data,
            createdAt: moment(this.state.data.createdAt, 'YYYY-MM-DD').toDate().toISOString(),
            updatedAt: moment(this.state.data.updatedAt, 'YYYY-MM-DD').toDate().toISOString()
        };
        this.props.createOrder(data);
    }

    render() {
        if (this.props.ordersReducer.redirectSuccess) {
            return <Redirect to='/' />
        }
        return  <div>
            <h1>Order Create</h1>
            {this.columns.map((item) => {
                return <div className="item-block" key={item.selector}>
                    <label>{item.name}</label>
                    {item.type === 'text' && <input disabled={item.disabled} type="text" value={this.state.data[item.selector]} onChange={(e) => this.changeItem(item.selector, e.target.value)}/>}
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
            <button onClick={this.createOrder} disabled={!this.state.data}>Create Order</button>
        </div>
    }
}
export default withRouter(OrderCreateComponent);
