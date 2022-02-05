import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { login_url, logout_url, register_url, use_showMe_url, update_password_url } from '../utils/constants'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertState, setAlertState] = useState('')
  const [alertContent, setAlertContent] = useState('')

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        setAdmin(user)
      }
    }
  }, [user])

  const setAlert = (show, state, content) => {
    setIsShowAlert(show)
    setAlertState(state)
    setAlertContent(content)
  }

  const clearAlert = () => {
    setIsShowAlert(false)
    setAlertState('')
    setAlertContent('')
  }

  const getCurrentUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(use_showMe_url)
      const newUser = response.data.user
      setUser(newUser)
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoading(false)
      } else {
        setError(true)
      }
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!oldPassword || !newPassword) {
      setAlert(true, 'warring', 'Please provide old password and new password !!!')
      return
    }
    if (oldPassword === newPassword) {
      setAlert(true, 'warring', 'Please, provide a different password !!!')
      return 
    }
    const body = { oldPassword, newPassword }
    setIsSubmitSuccess(false)
    try {
      await axios.patch(update_password_url, body)
      setOldPassword('')
      setNewPassword('')
      setIsSubmitSuccess(true)
      setAlert(true, 'success', 'Updated password !!!')
    } catch (error) {
      if (error.response.status === 401) {
        setAlert(true, 'warring', 'Current password is incorrect !!!')
        setIsSubmitSuccess(false)
      }
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setAlert(true, 'warring', 'Please provide email and password !!!')
      return
    }
    const user = { email, password }
    setIsSubmitSuccess(false)
    try {
      await axios.post(login_url, user)
      setEmail('')
      setPassword('')
      getCurrentUser()
      setIsSubmitSuccess(true)
      setAlert(true, 'success', 'Login successfully !!!')
    } catch (error) {
      if (error.response.status === 401) {
        setIsSubmitSuccess(false)
        setAlert(true, 'warring', 'Login false, wrong email or password !!!')
      }
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password || !name) {
      setAlert(true, 'warring', 'Please provide name and email and password !!!')
      return
    }
    const user = { name, email, password }
    setIsSubmitSuccess(false)
    try {
      await axios.post(register_url, user)
      setName('')
      setEmail('')
      setPassword('')
      getCurrentUser()
      setIsSubmitSuccess(true)
      setAlert(true, 'success', 'Register successfully !!!')
      return true
    } catch (error) {
      if (error.response.status === 401) {
        setIsSubmitSuccess(false)
        setAlert(true, 'warring', 'Register false, there is something wrong !!!')
      }
      if (error.response.status === 400) {
        setIsSubmitSuccess(false)
        setAlert(true, 'warring', 'Email already exists !!!')
      }
    }
  }

  const handleLogoutSubmit = async () => {
    try {
      await axios.get(logout_url)
      setUser(null)
      setAdmin(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      admin,
      name, 
      email, 
      password, 
      oldPassword, 
      newPassword,
      isLoading, 
      error,
      isSubmitSuccess,
      isShowAlert,
      alertState,
      alertContent,
      clearAlert,
      setIsSubmitSuccess,
      setName, 
      setEmail, 
      setPassword, 
      setOldPassword, 
      setNewPassword,  
      handleLoginSubmit, 
      handleRegisterSubmit, 
      handleLogoutSubmit,
      handleChangePasswordSubmit,
    }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
