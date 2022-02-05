import {
  CREATE_BOOKING, 
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

const booking_reducer = (state, action) => {
  if (action.type === UPDATE_BOOKING) {
    const { name, value } = action.payload
    return { 
      ...state,
      [name]: value
    }
  }
  if (action.type === BOOKING_SUBMIT_BEGIN) {
    return { 
      ...state,
      submit_loading: true
    }
  }
  if (action.type === BOOKING_SUBMIT_ERROR) {
    return { 
      ...state,
      submit_loading: false,
      submit_error: true
    }
  }
  if (action.type === BOOKING_SUBMIT_SUCCESS) {
    return { 
      ...state,
      submit_loading: false,
      submit_error: false,
    }
  }
  if (action.type === CLEAR_BOOKING) {
    return { 
      ...state,
      check_in: '',
      check_out: '',
      guests: '2 adults',
      room: '1 room',
    }
  }
  if (action.type === SET_CURRENT_USER_BOOKINGS_LOADING) {
    return {
      ...state,
      current_user_bookings_loading: true
    }
  }
  if (action.type === SET_CURRENT_USER_BOOKINGS_ERROR) {
    return {
      ...state,
      current_user_bookings_loading: false,
      current_user_bookings_error: true
    }
  }
  if (action.type === SET_CURRENT_USER_BOOKINGS) {
    return {
      ...state,
      current_user_bookings_loading: false,
      current_user_bookings_error: false,
      current_user_bookings: action.payload
    }
  }
  if (action.type === SET_BOOKING_ALERT) {
    return {
      ...state,
      is_show_booking_alert: action.payload.show,
      booking_alert: action.payload.content,
      booking_alert_state: action.payload.state
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default booking_reducer
