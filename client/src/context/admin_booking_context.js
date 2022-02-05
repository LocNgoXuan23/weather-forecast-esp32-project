import React, { useEffect, useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { bookings_url, users_url } from '../utils/constants'
import reducer from '../reducers/admin_booking_reducer'
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
  SET_FORM,
} from '../actions'

const initialState = {
  all_bookings_loading: true,
  all_bookings_error: false,
  all_bookings: [],
  action_status: 'create',
  action_id: null,
  action_object: null,

  check_in: '',
  check_out: '',
  guests: '2 adults',
  room: '1 room',
  email: '',

  alert: { show: false, msg: '', type: '' },
  is_submit_success: true,
}

const AdminBookingContext = React.createContext()
export const AdminBookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { admin } = useUserContext()

  useEffect(() => {
    if (state.is_submit_success) {
      fetchAllBookings()
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
      createBooking()
    }
    if (state.action_status === 'edit') {
      editBooking()
    } 
  }

  const editBooking = async () => {
    if (!state.check_in || !state.check_out || !state.guests || !state.room || !state.email) {
      showAlert(true, 'danger', 'please provide all of info !!!')
      return 
    }
    const editedBooking = { checkIn: state.check_in, checkOut: state.check_out, guests: state.guests, room: state.room, email: state.email }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.patch(`${bookings_url}/${state.action_id}`, editedBooking)
      showAlert(true, 'success', 'booking edited !!!')
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      showAlert(true, 'danger', `There's something wrong !!!`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }

  const fetchAllBookings = async () => {
    if (admin) {
      dispatch({ type: SET_LOADING })
      try {
        const response = await axios.get(bookings_url)
        const allBookings = response.data.bookings
        
        dispatch({ type: SET_SUCCESS, payload: allBookings })
      } catch (error) {
        console.log(error)
        dispatch({ type: SET_ERROR })
      }
    }
  }

  const removeAllBookings = () => {
    state.all_bookings.forEach((booking) => {
      removeBooking(booking.id)
    })
  }

  const removeBooking = async (bookingId) => {
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.delete(`${bookings_url}/${bookingId}`)
      showAlert(true, 'danger', `Success! booking removed`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    } catch (error) {
      showAlert(true, 'danger', `No booking with id : ${bookingId}`)
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
    }
  }


  const createBooking = async () => {
    if (!state.check_in || !state.check_out || !state.guests || !state.room || !state.email) {
      showAlert(true, 'danger', 'please provide all of info !!!')
      return 
    }
    const newBooking = { checkIn: state.check_in, checkOut: state.check_out, guests: state.guests, room: state.room, email: state.email }
    dispatch({ type: SET_SUBMIT_SUCCESS, payload: false })
    try {
      await axios.post(`${bookings_url}/adminCreateBooking`, newBooking)
      showAlert(true, 'success', 'create successfully !!!')
      dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      dispatch({ type: CLEAR_FORM })
    } catch (error) {
      if (error.response.status === 404) {
        showAlert(true, 'danger', `No user with email : ${state.email}  !!!`)
        dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      } else {
        showAlert(true, 'danger', `there's something wrong  !!!`)
        dispatch({ type: SET_SUBMIT_SUCCESS, payload: true })
      }
    }
  }

  const fetchSingleBooking = async (bookingId) => {
    try {
      const response = await axios.get(`${bookings_url}/${bookingId}`)
      const newBooking = response.data.booking
      dispatch({ type: SET_ACTION, payload: { 
        object: newBooking,
        id: bookingId,
        status: 'edit',
      } })
    } catch (error) {
      console.log(error)
    }
  }

  const updateEdit = (bookingId) => {
    fetchSingleBooking(bookingId)
  }

  const updateBookingForm = (e) => {
    let name = e.target.name
    let value = e.target.value
    dispatch({ type: UPDATE_FORM, payload: { name, value } })
  }

  const showAlert = (show = false, type = '', msg = '') => {
    dispatch({ type: SET_ALERT, payload: { show, type, msg } })
  }
 
  const clearForm = () => {
    dispatch({ type: CLEAR_FORM })
  }

  return (
    <AdminBookingContext.Provider value={{
      ...state,
      fetchAllBookings,
      removeBooking,
      showAlert,
      removeAllBookings,
      updateBookingForm,
      handleSubmit,
      updateEdit,
      clearForm
    }}>{children}</AdminBookingContext.Provider>
  )
}
// make sure use
export const useAdminBookingContext = () => {
  return useContext(AdminBookingContext)
}
