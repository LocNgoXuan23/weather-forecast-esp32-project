import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { 
    email, 
    password, 
    setEmail, 
    setPassword, 
    handleLoginSubmit, 
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

  return <Wrapper>
    <form className='form' onSubmit={handleLoginSubmit}>
      <h4>login form</h4>
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

      <button type='submit' className='btn btn-block submit-btn' onClick={handleLoginSubmit}>
        Login
      </button>
    </form>
    <div className="readme form">
      <h4>README</h4>
      <h5>Bạn có thể đăng nhập với tài khoản admin hoặc tạo tài khoản user bình thường để trải nghiệm các tính năng ứng với mỗi authority khác nhau:</h5>
      <div>
        <p>Bạn có thể vào register để đăng kí tài khoản cho user, hoặc dùng tài khoản đã được tạo sẵn sau : </p>
        <ul>
          <li>Email : user@gmail.com</li>
          <li>Password : secret</li>
        </ul>
      </div>
      <br />
      <div>
        <p>Nếu bạn muốn trải nghiệm những tính năng chỉ có trên role Admin thì hãy đăng nhập với tài khoản admin sau : </p>
        <ul>
          <li>Email : loc@gmail.com</li>
          <li>Password : secret</li>
        </ul>
      </div>
    </div>
  </Wrapper>
}


const Wrapper = styled.div`
  .form-alert.warring {
    color: red;
  }
  .form-alert.success {
    color: green;
  }
`

export default Login
