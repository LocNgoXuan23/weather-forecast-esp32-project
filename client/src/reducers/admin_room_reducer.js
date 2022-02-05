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

const admin_room_reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      all_rooms_loading: true
    }
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      all_rooms_loading: false,
      all_rooms_error: true,
    }
  }
  if (action.type === SET_SUCCESS) {
    const newRooms = action.payload
    return {
      ...state,
      all_rooms_loading: false,
      all_rooms_error: false,
      all_rooms: newRooms,
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
  if (action.type === SET_SUBMIT_SUCCESS) {
    return {
      ...state, 
      is_submit_success: action.payload
    }
  }
  if (action.type === CLEAR_FORM) {
    return {
      ...state, 
      name: '',
      price: '',
      size: '',
      capacity: '',
      services: '',
      bed: '',
      image: '',
      featured: '',
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
    const { name, price, description: { size, capacity, services, bed }, image, featured } = action.payload
    return {
        ...state,
        name, price, size, capacity, services: services.join(','), bed, image, featured: featured === true ? 'true' : 'false'
      }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default admin_room_reducer
