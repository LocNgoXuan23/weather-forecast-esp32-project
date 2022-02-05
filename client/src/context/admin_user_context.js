import React, { useEffect, useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { get_all_users_url, create_user_url, users_url, edit_user_url } from '../utils/constants'
import reducer from '../reducers/admin_user_reducer'
import { useUserContext } from './user_context'

import {
  SET_ALL_USERS_LOADING,
  SET_ALL_USERS_SUCCESS,
  SET_ALL_USERS_ERROR,
  UPDATE_USER_FORM,
  SET_ACTION_STATE,
  SET_ACTION_ID,
  SET_ALERT,
  CLEAR_FORM,
  SET_FORM,
  SET_SUBMIT_SUCCESS,
} from '../actions'

const initialState = {
  all_users_loading: true,
  all_users_error: false,
  all_users: [],
  action_state: 'create',
  action_id: null,
  name: '',
  email: '',
  password: '',
  alert: { show: false, msg: '', type: '' },
  is_submit_success: true,
}

const AdminUserContext = React.createContext()
export const AdminUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { admin } = useUserContext()

  useEffect(() => {
    if (state.is_submit_success) {
      fetchAdminAllUsers()
    }
  }, [state.is_submit_success])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.action_state === 'create') {
      createUser()
    }
    if (state.action_state === 'edit') {
      editUser()
    }
  }

  const editUser = async () => {
    if (!state.name || !state.email) {
      showAlert(true, 'danger', 'please provide name, email !!!')
      return
    }
    const editedUser = { name: state.name, email: state.email, password: state.password }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.patch(`${edit_user_url}/${state.action_id}`, editedUser)
      showAlert(true, 'success', `Success! user edited !!!`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      showAlert(true, 'danger', `There are something wrong !!!`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }

  const removeAllUsers = () => {
    state.all_users.forEach(user => {
      removeUser(user.id)
    })
  }

  const removeUser = async (userId) => {
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.delete(`${users_url}/${userId}`)
      showAlert(true, 'danger', `Success! user removed`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    } catch (error) {
      if (error.response.status === 404) {
        showAlert(true, 'danger', `No user with id : ${userId}`)
        dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      }
    }
  }

  const createUser = async () => {
    if (!state.name || !state.email || !state.password) {
      showAlert(true, 'danger', 'please provide name, email, password !!!')
      return
    }
    const newUser = { name: state.name, email: state.email, password: state.password }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.post(create_user_url, newUser)
      showAlert(true, 'success', 'create successfully !!!')
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      if (error.response.status === 400) {
        showAlert(true, 'danger', 'Email already exists !!!')
        dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      }
    }
  }

  const fetchAdminAllUsers = async () => {
    if (admin) {
      dispatch({ type: SET_ALL_USERS_LOADING })
      try {
        const response = await axios.get(get_all_users_url)
        const allUsers = response.data.users
        dispatch({ type: SET_ALL_USERS_SUCCESS, payload: allUsers })
      } catch (error) {
        console.log(error)
        dispatch({ type: SET_ALL_USERS_ERROR })
      }
    }
  }

  const updateUserForm = (e) => {
    let name = e.target.name
    let value = e.target.value
    dispatch({ type: UPDATE_USER_FORM, payload: { name, value } })
  }

  const updateEdit = (userId, name, email) => {
    dispatch({ type: SET_FORM, payload: { userId, name, email } })
    dispatch({ type: SET_ACTION_STATE, payload: 'edit'})
    dispatch({ type: SET_ACTION_ID, payload: userId })
  }

  const showAlert = (show = false, type = '', msg = '') => {
    dispatch({ type: SET_ALERT, payload: { show, type, msg } })
  }

  const clearForm = () => {
    dispatch({ type: CLEAR_FORM })
  }

  return (
    <AdminUserContext.Provider value={{
      ...state,
      updateUserForm,
      handleSubmit,
      fetchAdminAllUsers,
      showAlert,
      removeUser,
      removeAllUsers,
      updateEdit,
      clearForm
    }}>{children}</AdminUserContext.Provider>
  )
}
// make sure use
export const useAdminUserContext = () => {
  return useContext(AdminUserContext)
}
