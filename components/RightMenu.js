import React, { Component } from 'react';
import { logout } from '../utils/auth'
import { Menu } from 'antd';
class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="logout">
          <a onClick={logout}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;