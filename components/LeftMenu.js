import React, { Component } from 'react';
import { Menu } from 'antd';
class LeftMenu extends Component {
  render() {
    return (
   <Menu mode="horizontal">
       <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="menu">
          <a href="/menu">Menu</a>
        </Menu.Item>
        <Menu.Item key="stock">
          <a href="/stock">Stocks</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;