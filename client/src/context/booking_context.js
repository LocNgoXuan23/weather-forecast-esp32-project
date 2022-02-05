import axios from 'axios'
import React, { useEffect, useContext, useReducer, useState } from 'react'
import reducer from '../reducers/booking_reducer'
import { bookings_url, get_current_user_bookings_url } from '../utils/constants'

import {
  CLEAR_BOOKING, 
  UPDATE_BOOKING,
  BOOKING_SUBMIT_BEGIN,
  BOOKING_SUBMIT_SUCCESS,
  BOOKING_SUBMIT_ERROR,
  SET_CURRENT_USER_BOOKINGS,
  SET_CURRENT_USER_BOOKINGS_LOADING,
  SET_CURRENT_USER_BOOKINGS_ERROR,
  SET_BOOKING_ALERT
} from '../actions'

const initialState = {
  check_in: '',
  check_out: '',
  guests: '2 adults',
  room: '1 room',
  submit_loading: false,
  submit_error: false,
  current_user_bookings: [],
  current_user_bookings_loading: true,
  current_user_bookings_error: false,
  is_show_booking_alert: false,
  booking_alert_state: '',
  booking_alert: '',
}

const BookingContext = React.createContext()

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchCurrentUserBookings = async () => {
    dispatch({ type: SET_CURRENT_USER_BOOKINGS_LOADING })
    try {
      const response = await axios.get(get_current_user_bookings_url)
      const newCurrentUserBookings = response.data.bookings
      dispatch({ type: SET_CURRENT_USER_BOOKINGS, payload: newCurrentUserBookings })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_CURRENT_USER_BOOKINGS_ERROR })
    }
  }

  const clearAlert = () => {
    dispatch({ type: SET_BOOKING_ALERT, payload: {
      show: false,
      content: '',
      state: ''
    } })
  }

  const submitBookingForm = (e) => {
    e.preventDefault()
    if (!state.check_in || !state.check_out) {
      dispatch({ type: SET_BOOKING_ALERT, payload: {
        show: true,
        content: 'please provide info !!',
        state: 'warring'
      } })
      return
    }
    if (state.check_in && state.check_out && !state.submit_loading) {
      createBooking()
    } 
  }

  const createBooking = async () => {
    dispatch({ type: BOOKING_SUBMIT_BEGIN })
    try {
      axios.post(bookings_url, {
        checkIn: state.check_in,
        checkOut: state.check_out,
        guests: state.guests,
        room: state.room,
      })
      dispatch({ type: BOOKING_SUBMIT_SUCCESS })
      dispatch({ type: CLEAR_BOOKING })
      dispatch({ type: SET_BOOKING_ALERT, payload: {
        show: true,
        content: 'Submit Successfully !!!',
        state: 'success'
      } })
    } catch (error) {
      console.log(error)
      dispatch({ type: BOOKING_SUBMIT_ERROR })
    }
  }

  const updateBookingForm = (e, targetName, targetValue) => {
    let name
    let value
    if (e) {
      name = e.target.name
      value = e.target.value
      if (name === 'guests' || name === 'room') {
        value = e.target.value
      }
    } else {
      name = targetName.toString()
      value = targetValue.toString()
    }
    dispatch({ type: UPDATE_BOOKING, payload: { name, value } })
  }

  return (
    <BookingContext.Provider value={{
      ...state,
      updateBookingForm,
      submitBookingForm,
      fetchCurrentUserBookings,
      clearAlert
    }}>{children}</BookingContext.Provider>
  )
}
// make sure use
export const useBookingContext = () => {
  return useContext(BookingContext)
}
