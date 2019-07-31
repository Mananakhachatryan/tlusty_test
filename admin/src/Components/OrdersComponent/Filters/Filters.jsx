import React, { Component } from 'react';

class FiltersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return  <div>
            <h6>Filtesr</h6>
            <div>
                <div className="date-filter">
                    <input type='date' onChange={(e) => this.props.onChange('from', e.target.value)} />
                    <input type='date' onChange={(e) => this.props.onChange('to', e.target.value)} />
                </div>
                <div className="promoted">
                    <select onChange={(e) => this.props.onChange('promoted', e.target.value)}>
                        <option>select</option>
                        <option>true</option>
                        <option>false</option>
                    </select>
                </div>
            </div>
        </div>
    }
}
export default FiltersComponent;
