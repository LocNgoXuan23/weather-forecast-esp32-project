import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'

const Logout = () => {
  const { 
    email, 
    password, 
    setEmail, 
    setPassword, 
    handleLogoutSubmit, 
  } = useUserContext()

  return (
    <>
      <form className='form' onSubmit={handleLogoutSubmit}>
        <h4>Logout form</h4>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-input email-input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-input password-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block submit-btn'>
          submit
        </button>
      </form>
      <div className='container'>
        <button className='btn logout-btn'>
          Logout
        </button>
      </div>
    </>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default Logout
