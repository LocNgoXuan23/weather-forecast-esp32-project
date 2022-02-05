import React, { useEffect, useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { rooms_url } from '../utils/constants'
import reducer from '../reducers/admin_room_reducer'
import { useUserContext } from './user_context'

import {
  SET_LOADING, 
  SET_SUCCESS, 
  SET_ERROR,
  SET_ALERT,
  UPDATE_FORM,
  SET_SUBMIT_SUCCESS,
  CLEAR_FORM,
  SET_ACTION,
  SET_FORM
} from '../actions'

const initialState = {
  all_rooms_loading: true,
  all_rooms_error: false,
  all_rooms: [],
  action_status: 'create',
  action_id: null,
  action_object: null,

  name: '',
  price: '',
  size: '',
  capacity: '',
  services: '',
  bed: '',
  image: '',
  featured: '',

  alert: { show: false, msg: '', type: '' },
  is_submit_success: true,
}

const AdminRoomContext = React.createContext()
export const AdminRoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { admin } = useUserContext()

  useEffect(() => {
    if (state.is_submit_success) {
      fetchAllRooms()
    }
  }, [state.is_submit_success])

  useEffect(() => {
    if (state.action_object) {
      dispatch({ type: SET_FORM, payload: state.action_object })
    }
  }, [state.action_object])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.action_status === 'create') {
      createRoom()
    }
    if (state.action_status === 'edit') {
      editRoom()
    }
  }

  const removeAllRooms = () => {
    state.all_rooms.forEach(room => {
      removeRoom(room.id)
    })
  }

  const editRoom = async () => {
    if (!state.name || !state.price || !state.size || !state.capacity || !state.services || !state.bed || !state.image || !state.featured) {
      showAlert(true, 'danger', 'please provide all of info !!!')
      return 
    }
    if (isNaN(state.price) || isNaN(state.size)) {
      showAlert(true, 'danger', 'price or size invalid !!!')
      return 
    }
    if ((state.featured !== 'true') && (state.featured !== 'false')) {
      showAlert(true, 'danger', 'featured invalid !!!')
      return 
    }
    const editedRoom = { 
      name: state.name, 
      price: parseInt(state.price),
      description: {
        size: parseInt(state.size),
        capacity: state.capacity,
        services: state.services.split(','),
        bed: state.bed
      },
      image: state.image,
      featured: state.featured === 'true' ? true : false
    }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.patch(`${rooms_url}/${state.action_id}`, editedRoom)
      showAlert(true, 'success', 'room edited !!!')
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      showAlert(true, 'danger', `There's something wrong !!!`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }

  const removeRoom = async (roomId) => {
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.delete(`${rooms_url}/${roomId}`)
      showAlert(true, 'danger', `Success! room removed`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    } catch (error) {
      showAlert(true, 'danger', `No room with id : ${roomId}`)
        dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }

  const createRoom = async () => {
    if (!state.name || !state.price || !state.size || !state.capacity || !state.services || !state.bed || !state.image || !state.featured) {
      showAlert(true, 'danger', 'please provide all of info !!!')
      return 
    }
    if (isNaN(state.price) || isNaN(state.size)) {
      showAlert(true, 'danger', 'price or size invalid !!!')
      return 
    }
    if ((state.featured !== 'true') && (state.featured !== 'false')) {
      showAlert(true, 'danger', 'featured invalid !!!')
      return 
    }
    const newRoom = { 
      name: state.name, 
      price: parseInt(state.price),
      description: {
        size: parseInt(state.size),
        capacity: state.capacity,
        services: state.services.split(','),
        bed: state.bed
      },
      image: state.image,
      featured: state.featured === 'true' ? true : false
    }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.post(rooms_url, newRoom)
      showAlert(true, 'success', 'create successfully !!!')
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }

  const fetchAllRooms = async () => {
    if (admin) {
      dispatch({ type: SET_LOADING })
      try {
        const response = await axios.get(rooms_url)
        const allRooms = response.data.rooms
        dispatch({ type: SET_SUCCESS, payload: allRooms })
      } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERROR })
      }
    }
  }

  const fetchSingleRoom = async (roomId) => {
    try {
      const response = await axios.get(`${rooms_url}/${roomId}`)
      const newRoom = response.data.room
      dispatch({ type: SET_ACTION, payload: { 
        object: newRoom,
        id: roomId,
        status: 'edit',
      } })
    } catch (error) {
      console.log(error)
    }
  }

  const updateForm = (e) => {
    let name = e.target.name
    let value = e.target.value
    dispatch({ type: UPDATE_FORM, payload: { name, value } })
  }

  const updateEdit = (roomId) => {
    fetchSingleRoom(roomId)
  }

  const showAlert = (show = false, type = '', msg = '') => {
    dispatch({ type: SET_ALERT, payload: { show, type, msg } })
  }

  const clearForm = () => {
    dispatch({ type: CLEAR_FORM })
  }

  return (
    <AdminRoomContext.Provider value={{
      ...state,
      fetchAllRooms,
      showAlert,
      updateForm,
      handleSubmit,
      removeRoom,
      removeAllRooms,
      updateEdit,
      clearForm
    }}>{children}</AdminRoomContext.Provider>
  )
}
// make sure use
export const useAdminRoomContext = () => {
  return useContext(AdminRoomContext)
}
