import {
  SET_ALL_USERS_LOADING,
  SET_ALL_USERS_SUCCESS,
  SET_ALL_USERS_ERROR,
  UPDATE_USER_FORM,
  SET_ALERT,
  SET_FORM,
  CLEAR_FORM,
  SET_CREATE_SUCCESS,
  SET_SUBMIT_SUCCESS,
  SET_ACTION_STATE,
  SET_ACTION_ID
} from '../actions'

const admin_user_reducer = (state, action) => {
  if (action.type === SET_ALL_USERS_LOADING) {
    return {
      ...state,
      all_users_loading: true
    }
  }
  if (action.type === SET_ALL_USERS_ERROR) {
    return {
      ...state,
      all_users_loading: false,
      all_users_error: true
    }
  }
  if (action.type === SET_ALL_USERS_SUCCESS) {
    const newUsers = action.payload.map((user) => {
      return {
        name: user.name,
        email: user.email,
        id: user._id,
      }
    })
    return {
      ...state,
      all_users_loading: false,
      all_users_error: false,
      all_users: newUsers
    }
  }
  if (action.type === UPDATE_USER_FORM) {
    const { name, value } = action.payload
    return {
      ...state,
      [name]: value,
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
      email: '',
      password: '',
      action_state: 'create',
      action_id: null,
    }
  }
  if (action.type === SET_FORM) {
    const { userId, name, email } = action.payload
    return {
      ...state,
      name: name,
      email: email,
    }
  }
  if (action.type === SET_ACTION_STATE) {
    return {
      ...state, 
      action_state: action.payload
    }
  }

  if (action.type === SET_ACTION_ID) {
    return {
      ...state,
      action_id: action.payload
    }
  }
  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default admin_user_reducer
