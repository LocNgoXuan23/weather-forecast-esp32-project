import {
  LOAD_ROOMS,
  GET_FILTER_BEGIN,
  GET_FILTER_SUCCESS,
  GET_FILTER_ERROR,
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  GET_SINGLE_ROOM_BEGIN,
  GET_SINGLE_ROOM_SUCCESS,
  GET_SINGLE_ROOM_ERROR,
  GET_ALL_ROOMS_LOADING,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_ERROR,
} from '../actions'

const rooms_reducer = (state, action) => {
  if (action.type === GET_SINGLE_ROOM_BEGIN) {
    return { ...state, single_room_loading: true }
  }
  if (action.type === GET_SINGLE_ROOM_SUCCESS) {
    return { 
      ...state, 
      single_room_error: false, 
      single_room_loading: false, 
      single_room: action.payload
    }
  }
  if (action.type === GET_SINGLE_ROOM_ERROR) {
    return { 
      ...state, 
      single_room_error: true, 
      single_room_loading: false 
    }
  }
  if (action.type === GET_FILTER_BEGIN) {
    return {
      ...state,
      filter_loading: true,
      filter_error: false
    }
  }
  if (action.type === GET_FILTER_ERROR) {
    return {
      ...state,
      filter_loading: false,
      filter_error: true
    }
  }
  if (action.type === GET_FILTER_SUCCESS) {
    return {
      ...state,
      filter_loading: false,
      filter_error: false,
      filtered_rooms: action.payload
    } 
  }
  if (action.type === GET_ALL_ROOMS_LOADING) {
    return {
      ...state,
      all_rooms_loading: true
    }
  }

  if (action.type === GET_ALL_ROOMS_ERROR) {
    return {
      ...state,
      all_rooms_loading: false,
      all_rooms_error: true,
    }
  }

  if (action.type === GET_ALL_ROOMS_SUCCESS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    let maxSize = action.payload.map((p) => p.description.size)
    maxSize = Math.max(...maxSize)
    return {
      ...state,
      all_rooms: action.payload,
      featured_rooms: action.payload.filter((item) => item.featured === true),
      all_rooms_loading: false,
      all_rooms_error: false,
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
        max_size: maxSize,
        size: maxSize
      }
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    console.log('UPDATE_SORT')
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    return { ...state, filtered_products: action.payload }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { 
      ...state,
      filters: { ...state.filters, [name]: value } 
    }
  }
  if (action.type === FILTER_PRODUCTS) {
    return {
      ...state,
      filtered_products: action.payload
    }
  }
  if (action.type === CLEAR_FILTERS) {
    return { 
      ...state,
      filters: {
        ...state.filters,
        name: '',
        featured: true,
        service: 'all',
        size: state.filters.max_size,
        price: state.filters.max_price,
      } 
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default rooms_reducer
