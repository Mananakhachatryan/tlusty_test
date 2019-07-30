import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarComponent.css';
class NavbarComponent extends Component {
  render() {
    return <div className="navbar">
        <NavLink
            exact={true}
            activeClassName="active"
            to='/'
        >Orders</NavLink>
    </div>;
  }
}
export default NavbarComponent;
