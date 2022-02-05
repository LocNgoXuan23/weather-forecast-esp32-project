import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'
import { useHistory } from 'react-router-dom'

const ChangePasswordPage = () => {
  const { 
    oldPassword, 
    newPassword,
    setOldPassword, 
    setNewPassword,    
    handleChangePasswordSubmit, 
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
      }, 1500)
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
      <form className='form' onSubmit={handleChangePasswordSubmit}
      >
        <h4>change password form</h4>
        <div className='form-row'>
          <label htmlFor='oldPassword' className='form-label'>
            Old Password 
          </label>
          <input
            type='password'
            name='oldPassword'
            className='form-input password-input'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='newPassword' className='form-label'>
            New Password
          </label>
          <input
            type='password'
            name='newPassword'
            className='form-input password-input'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {isShowAlert && 
          <p className={`form-alert ${alertState === 'warring' ? 'warring' : 'success'}`}>{alertContent}</p>
        }

        <button type='submit' className='btn btn-block submit-btn' onClick={handleChangePasswordSubmit}>
          change
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

export default ChangePasswordPage
