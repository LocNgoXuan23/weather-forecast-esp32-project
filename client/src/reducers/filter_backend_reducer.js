import {
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
} from '../actions'

const filter_reducer = (state, action) => {
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
      filtered_products: action.payload
    } 
  }
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
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
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,    
      } 
    }
  }


  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
