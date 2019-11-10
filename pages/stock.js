import React from 'react';
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import nextCookie from 'next-cookies'
import { List, Avatar, Modal, notification, Icon } from 'antd';
import { withAuthSync } from '../utils/auth'
import getHost from '../utils/get-host'
import Router from 'next/router'
const { confirm } = Modal;
const openNotification = (msg) => {
  notification.open({
    message: 'Action Notifications',
    description: msg,
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });
};
const showReceivedConfirm = (e, itemid, storeid, token) => {
  const config = {
    title: 'Do you Want to Receive these items?',
    content: 'This will increase the current stock by 1000.',
    async onOk() {
      const url = '/api/put'
      const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/receive-order/'
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endUrl, itemid, storeid, qty: 1000, token })
      })
      if (response.status === 200) {
        const { message } = await response.json()
        openNotification(message)
        Router.replace('/stock')
      } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    },
    onCancel() {
    },
  }
  confirm(config);
}

const showOrderConfirm = (e, itemid, storeid, token) => {
  const config = {
    title: 'Do you Want to Place Order on this item?',
    content: 'This will place an order of 1000 units of this item',
    async onOk() {
      const url = '/api/put'
      const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/place-order/'
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endUrl, itemid, storeid, token })
      })
      if (response.status === 200) {
        const { message } = await response.json()
        openNotification(message)
        Router.replace('/stock')
      } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    },
    onCancel() {
    },
  }
  confirm(config);
}

const Stock = props => {
  const {stock, location, token, locationName} = props;
  return (
    <Layout location={locationName}>
          {stock.length > 0 && (
            <div>
              <h1>Current Stock level of items</h1>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={stock}
                renderItem={item => (
                  <List.Item
                    actions={
                      item.ordered ? [
                      <span key="list-loadmore-edit">Ordered</span>, 
                      <a key="list-loadmore-more" onClick={(e) => showReceivedConfirm(e, item.id, location, token)}>Receive Order</a>
                      ] : 
                      [
                        <a key="list-loadmore-edit" onClick={(e) => showOrderConfirm(e, item.id, location, token)}>Place Order</a>
                      ]
                    }
                  >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={<span> Current Stock Level: {item.qoh}</span>}
                      />
                      <div>{item.stockstatus}</div>
                  </List.Item>
                )}
              />
            </div>
          )}
    </Layout>
  );
}

Stock.getInitialProps = async ctx => {
  
  const { token, location, locationName } = nextCookie(ctx)
  const apiUrl = getHost(ctx.req) + '/api/get'
  const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/stock-level/'+location;
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { Location: '/' }).end()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token }),
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ endUrl, token })
    })

    if (response.ok) {
      const js = await response.json()
      const stock = js.data
      return {stock, location, token, locationName}
    } else {
      console.log('error')
      return await redirectOnError()
    }
  } catch (error) {
    console.log('catch error')
    return redirectOnError()
  }
}
export default withAuthSync(Stock)