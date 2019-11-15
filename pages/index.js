import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { login } from '../utils/auth'
import nextCookie from 'next-cookies'
import getHost from '../utils/get-host'
import Router from 'next/router'

function Login (props) {
  const [userData, setUserData] = useState({ username: '', password: '', location: '1', error: '' })
  const {store} = props;
  async function handleSubmit (event) {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    const username = userData.username
    const location = userData.location
    const password = userData.password
    const url = '/api/login'

    try {
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, location })
      })
      if (response.status === 200) {
        const { token, locationName } = await response.json()
        await login({ token, location, locationName })
      } else {
        console.log('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return (
    <Layout location={'NEW'}>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Choose Store Location and Login</label>

          {store.length > 0 && (
          <select onChange={event => 
            setUserData(
              Object.assign({}, userData, { location: event.target.value })
            )
          }>
            {store.map((store, i) => {
                return (
                  <option key={store.id} value={store.id}>{store.store_name}</option>
                )
            })}
          </select>
          )}
          <input
            type='text'
            id='username'
            name='username'
            placeholder='email'
            value={userData.username}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { username: event.target.value })
              )
            }
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='*********'
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { password: event.target.value })
              )
            }
          />
          <button type='submit'>Login</button>

          {userData.error && <p className='error'>Error: {userData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input, select {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </Layout>
  )
}

Login.getInitialProps = async (ctx) => {
  {

    const { token, location } = nextCookie(ctx)
    const apiUrl = getHost(ctx.req) + '/api/get'
    const endUrl = 'https://sunlight-cafe.herokuapp.com/api/v1/store/';
    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/menu')
        : ctx.res.writeHead(302, { Location: '/dashboard' }).end()
    
    if(location && token){
      return await redirectOnError()
    }else{
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
          let store = js.data
          return {store}
        } else {
          return await redirectOnError()
        }
      } catch (error) {
        // Implementation or Network error
        return redirectOnError()
      }
    }
  }
}
export default Login