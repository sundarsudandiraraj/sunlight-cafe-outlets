import React from 'react';
import RecipeCard from '../components/RecipeCard';
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import nextCookie from 'next-cookies'
import { withAuthSync, setStoreName } from '../utils/auth'
import getHost from '../utils/get-host'
import Router from 'next/router'

const Menu = props => {
    const {menu, locationName, token, location} = props;
    return (
        <Layout location={locationName}>
              <h1>Welcome to Sunlight Cafe, {locationName}</h1>
              {menu.length > 0 && <RecipeCard meals={menu} token={token} location={location}/>}
        </Layout>
      );
}
Menu.getInitialProps = async ctx => {

  const { token, location, locationName } = nextCookie(ctx)
  const apiUrl = getHost(ctx.req) + '/api/get'
  const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/menus/'+location;
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
      let menu = js.data
      return {menu, token, location, locationName}
    } else {
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}
export default withAuthSync(Menu)