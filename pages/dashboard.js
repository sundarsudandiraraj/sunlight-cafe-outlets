import React from 'react'
import nextCookie from 'next-cookies'
import Layout from '../components/layout'
import { withAuthSync } from '../utils/auth'

const Profile = props => {
  const { locationName } = props

  return (
    <Layout location={locationName}>
      <h1>Dashboard</h1>
      <img class="profile-img" src="https://media.licdn.com/dms/image/C5103AQE02cqugpesGg/profile-displayphoto-shrink_200_200/0?e=1579132800&v=beta&t=pgilMQdvFm6zv4G74cYDWs_L3qa3vkWjW2PDC3jUvPU" alt='Avatar' />
      <p className='lead'>What would you like to do ? <a href="/stock">Check the Stock Level </a></p>
      <img src="https://cdn.dribbble.com/users/2455524/screenshots/4933437/dashboard.png" alt='Avatar' />

      <style jsx>{`
        .profile-img {
          max-width: 200px;
          border-radius: 0.5rem;
        }
        h1 {
          margin-bottom: 0;
        }
        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }
        p {
          color: #6a737d;
        }
      `}</style>
    </Layout>
  )
}

Profile.getInitialProps = async ctx => {
  const { token, location, locationName } = nextCookie(ctx)
  return {location, token, locationName}
}

export default withAuthSync(Profile)