import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const { 
    name, 
    email, 
    password, 
    setName, 
    setEmail, 
    setPassword, 
    handleRegisterSubmit, 
    isSubmitSuccess,
    setIsSubmitSuccess,
    isShowAlert,
    alertState,
    alertContent,
    clearAlert,
  } = useUserContext()
  const history = useHistory()

  useEffect(() => {
    if (isSubmitSuccess) {
      setTimeout(() => {
        history.push('/')
        setIsSubmitSuccess(false)
      }, 1000)
    }
  }, [isSubmitSuccess])

  useEffect(() => {
    if (isShowAlert) {
      setTimeout(() => {
        clearAlert()
      }, 1000)
    }
  }, [isShowAlert])

  return (
    <Wrapper>
      <form className='form' onSubmit={handleRegisterSubmit}
      >
        <h4>Register form</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-input name-input'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
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
            placeholder="Enter email"
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
            placeholder="Enter password"
          />
        </div>

        {isShowAlert && 
          <p className={`form-alert ${alertState === 'warring' ? 'warring' : 'success'}`}>{alertContent}</p>
        }

        <button type='submit' className='btn btn-block submit-btn'>
          Register
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-alert.warring {
    color: red;
  }
  .form-alert.success {
    color: green;
  }
`

export default Register
