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
  GET_SINGLE_OBJECT,
  GET_SINGLE_OBJECT_LOADING,
  GET_SINGLE_OBJECT_ERROR
} from '../actions'

const admin_cart_reducer = (state, action) => {
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
    const newCarts = action.payload
    return {
      ...state,
      all_carts_loading: false,
      all_carts_error: false,
      all_carts: newCarts,
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
  if (action.type === GET_SINGLE_OBJECT_LOADING) {
    return {
      ...state,
      single_cart_loading: true
    }
  }
  if (action.type === GET_SINGLE_OBJECT_ERROR) {
    return {
      ...state,
      single_cart_loading: false,
      single_cart_error: true,
    }
  } 
  if (action.type === GET_SINGLE_OBJECT) {
    return {
      ...state,
      single_cart_loading: false,
      single_cart_error: false,
      single_cart: action.payload
    }
  } 
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default admin_cart_reducer
