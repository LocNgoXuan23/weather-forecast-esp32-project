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

const admin_booking_reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      all_bookings_loading: true
    }
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      all_bookings_loading: false,
      all_bookings_error: true,
    }
  }
  if (action.type === SET_SUCCESS) {
    const newBookings = action.payload.map((booking) => {
      const date = new Date(booking.createdAt)
      const fomatDate = date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds()
      return {
        ...booking,
        // createdAt: fomatDate
      }
    })
    return {
      ...state,
      all_bookings_loading: false,
      all_bookings_error: false,
      all_bookings: newBookings,
    }
  } 
  if (action.type === SET_SUBMIT_SUCCESS) {
    return {
      ...state, 
      is_submit_success: action.payload
    }
  } 
  if (action.type === SET_ALERT) {
    const { show, type, msg } = action.payload
    return {
      ...state,
      alert: {
        ...state.alert,
        show, 
        type, 
        msg
      }
    }
  }
  if (action.type === UPDATE_FORM) {
    const { name, value } = action.payload
    return {
      ...state,
      [name]: value,
    }
  }
  if (action.type === CLEAR_FORM) {
    return {
      ...state, 
      check_in: '',
      check_out: '',
      guests: '2 adults',
      room: '1 room',
      email: '',
      action_status: 'create',
      action_id: null,
    }
  }
  if (action.type === SET_ACTION) {
    const { object, status, id } = action.payload
    return {
      ...state,
      action_status: status,
      action_id: id,
      action_object: object,
    }
  }
  if (action.type === SET_FORM) {
    const { checkIn, checkOut, guests, room, userEmail } = action.payload
    console.log(checkIn, checkOut, guests, room, userEmail)
    return {
        ...state,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
        room: room,
        email: userEmail,
      }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default admin_booking_reducer
