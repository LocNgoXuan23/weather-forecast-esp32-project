import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/rooms_reducer'
import {
  LOAD_ROOMS,
  GET_FILTER_BEGIN,
  GET_FILTER_SUCCESS,
  GET_FILTER_ERROR,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  GET_SINGLE_ROOM_BEGIN,
  GET_SINGLE_ROOM_SUCCESS,
  GET_SINGLE_ROOM_ERROR,
  GET_ALL_ROOMS_LOADING,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_ERROR,
} from '../actions'
import { rooms_url } from '../utils/constants'
import axios from 'axios'

const initialState = {
  filter_loading: true,
  filter_error: false,
  filtered_rooms: [],
  all_rooms_loading: true,
  all_rooms_error: false,
  all_rooms: [],
  featured_rooms: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    name: '',
    featured: true,
    service: 'all',
    max_size: 0,
    min_size: 0,
    size: 0,
    min_price: 0,
    max_price: 0,
    price: 0,
  },
  single_room_loading: true, 
  single_room_error: false, 
  single_room: null,
}

const RoomsContext = React.createContext()

export const RoomsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchFilterSortRooms()
  }, [state.sort, state.filters])

  useEffect(() => {
    fetchAllRooms()
  }, [])

  const fetchSingleRoom = async (url) => {
    dispatch({ type: GET_SINGLE_ROOM_BEGIN })
    try {
      const response = await axios.get(url)
      const room = response.data.room
      dispatch({ type: GET_SINGLE_ROOM_SUCCESS, payload: room })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_SINGLE_ROOM_ERROR })
    }
  }

  const fetchAllRooms = async () => {
    dispatch({ type: GET_ALL_ROOMS_LOADING})
    try {
      const response = await axios.get(rooms_url)
      const rooms = response.data.rooms
      dispatch({ type: GET_ALL_ROOMS_SUCCESS, payload: rooms})
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_ALL_ROOMS_ERROR})
    }
  }

  const fetchFilterSortRooms = async () => {
    dispatch({ type: GET_FILTER_BEGIN })
    const sortUrl = `sort=${state.sort}`
    const { name, featured, service, size, price, } = state.filters
    const filterUrl = `&name=${name}&service=${service === 'all' ? '' : service}&numericFilters=price<=${price + 1},description.size<=${size + 1}&featured=${featured === true ? '' : featured}`
    const newUrl = `${rooms_url}?${sortUrl}${filterUrl}`
    try {
      const response = await axios.get(newUrl)
      const filteredRooms = response.data.rooms
      dispatch({ type: GET_FILTER_SUCCESS, payload: filteredRooms})
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_FILTER_ERROR })
    }
  }

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'service') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price' || name === 'size') {
      value = Number(value)
    }
    if (name === 'featured') {
      value = e.target.checked
    }
    // console.log(name, value)
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <RoomsContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters,
      fetchSingleRoom,
    }}>
      {children}
    </RoomsContext.Provider>
  )
}
// make sure use
export const useRoomsContext = () => {
  return useContext(RoomsContext)
}
