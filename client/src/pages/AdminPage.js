import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  return <main>
    <PageHero title="admin" />
    <Wrapper className="section section-center">
      <Link to="/admin/user" type='submit' className='btn btn-block submit-btn'>
          Go to admin user
      </Link>
      <Link to="/admin/room" type='submit' className='btn btn-block submit-btn'>
        Go to admin room
      </Link>
      <Link to="/admin/booking" type='submit' className='btn btn-block submit-btn'>
        Go to admin booking
      </Link>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: flex;
  width: 400px;
  flex-direction: column;
  .btn {
    display: block;
    text-align: center;
  }
`
export default AdminPage
