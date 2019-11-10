import React, { Component } from 'react';
import { Menu } from 'antd';
import { logout } from '../utils/auth'
class Header extends Component {
render() {
    return (
        <nav className="menuBar">
            <div className="logo">
            <a href="">Sun-Cafe</a>
          </div>

          <div className="menuCon">
            <div className="leftMenu">
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
            </div>
            <div className="rightMenu">
            <Menu mode="horizontal">
                <Menu.Item key="logout">
                <a onClick={logout}>Logout</a>
                </Menu.Item>
            </Menu>
            </div>
        </div>
        <style jsx>{`
            .menuBar{
                padding: 0 20px;
                border-bottom: solid 1px #e8e8e8;
                overflow: auto;
                box-shadow: 0 0 30px #f3f1f1;
              }
              .logo{
                width: 150px;
                float: left;
              }
              .logo a{
                display: inline-block;
                font-size: 20px;
                padding: 8px 20px;
                text-transform: capitalize;
              }
              .menuCon{
                width: calc(100% - 150px);
                float: left;
              }
              .menuCon .ant-menu-item{
                padding: 0px 5px;
              }
              .menuCon .ant-menu-submenu-title{
                padding: 10px 20px;
              }
              .menuCon .ant-menu-item a, .menuCon .ant-menu-submenu-title a{
                padding: 10px 15px;
              }
              .menuCon .ant-menu-horizontal{
                border-bottom: none;
              }
              .menuCon .leftMenu{
                float: left;
              }
              .menuCon .rightMenu{
                float: right;
              }
        `}</style>
        </nav>
    );
  }
}
export default Header;
