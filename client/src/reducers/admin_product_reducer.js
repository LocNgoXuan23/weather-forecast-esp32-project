import {
  SET_ALL_PRODUCTS_LOADING,
  SET_ALL_PRODUCTS_SUCCESS,
  SET_ALL_PRODUCTS_ERROR,
  UPDATE_FORM,
  SET_SUBMIT_SUCCESS,
  SET_ALERT,
  CLEAR_FORM,
  SET_ACTION,
  SET_FORM
} from '../actions'

const admin_product_reducer = (state, action) => {
  if (action.type === SET_ALL_PRODUCTS_LOADING) {
    return {
      ...state,
      all_products_loading: true
    }
  }
  if (action.type === SET_ALL_PRODUCTS_ERROR) {
    return {
      ...state,
      all_products_loading: false,
      all_products_error: true,
    }
  }
  if (action.type === SET_ALL_PRODUCTS_SUCCESS) {
    const newProducts = action.payload
    return {
      ...state,
      all_products_loading: false,
      all_products_error: false,
      all_products: newProducts,
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
  if (action.type === CLEAR_FORM) {
    return {
      ...state, 
      name: '',
      price: '',
      image: '', 
      colors: '',
      company: '',
      description: '',
      category: '',
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
    return {
        ...state,
        ...action.payload,
        colors: action.payload.colors.join(','),
      }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default admin_product_reducer
