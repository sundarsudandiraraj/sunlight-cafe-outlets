
import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Image from './Image';
import { Modal, notification, Icon } from 'antd';
import Router from 'next/router'
const { confirm } = Modal;

const openNotification = (msg) => {
    notification.open({
      message: 'Action Notifications',
      description: msg,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};
const showReduceStockConfirm = (e, menuid, storeid, token, status) => {
    const config = {
      title: 'Do you Want to deduct stock on this menu item?',
      content: 'This will deduct stock of all items that is required to prepare this Menu',
      async onOk() {
        const url = '/api/put'
        const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/reduce-item-stock/';
        const qty = 1;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endUrl, menuid, storeid, qty, token })
        })
        if (response.status === 200) {
          const { message } = await response.json()
          openNotification(message)
          Router.replace('/menu')
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      },
      onCancel() {
      },
    }

    if (status != 'Out of Stock'){
        confirm(config);
    }else{
        Modal.error({
            title: 'Out of Stock',
            content: 'The Selected Menu item is temporarly unavailable',
          });
    }
  }

export default class RecipeCard extends Component {
	render(){
        const {location, token, meals} = this.props
		return(
          <div>
         	{meals.map((item, index) => {
         		return ( 
         			<Card 
                         key={index}
                         onClick={(e) => showReduceStockConfirm(e, item.id, location, token, item.status)}>
         				<Image source={item.image} text={item.menu_name} status={item.status}/>
         				<Title title={item.menu_name} price={item.price}/>
         			</Card> 
         		)
         	})}
          </div>
		)
	}
}

const Card = styled.a`
	max-width: 350px;
	width: 100%;
	display: inline-block;
	border-radius: 3px;
	text-decoration: none;
	color: #000;
	margin: 0 10px 15px;
    box-shadow: 7px 7px 50px -10px rgba(0, 0, 0, .5);
`;