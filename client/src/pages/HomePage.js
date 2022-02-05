import React from 'react'
import { FeaturedRooms, Hero, BookingForm, Services, Contact } from '../components'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomePage = () => {
  return <Wrapper>
    <h1>Welcome to IOT K64</h1>
    <h2><Link to='/class/a1'>Danh sách sinh viên lớp tiếng nhật A1</Link></h2>
    <h2><Link to='/class/a2'>Danh sách sinh viên lớp tiếng nhật A2</Link></h2>

    {/* <h2><a href='/class/a1'>Danh Sach sinh vien A1</a></h2>
    <h2><a href='/class/a2'>Danh Sach sinh vien A2</a></h2> */}
  </Wrapper>
}

const Wrapper = styled.main`
  h1 {
    margin-left: 100px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  h2 {
    margin-left: 150px;
  }
`

export default HomePage
