import React from 'react'
import { useRoomsContext } from '../context/rooms_context'
import RoomGridView from './RoomGridView'
import RoomListView from './RoomListView'
import Error from './Error'
import Loading from './Loading'

const RoomList = () => {
  const { filtered_rooms: rooms, grid_view, filter_loading, filter_error } = useRoomsContext()

  if (filter_loading) {
    return <Loading />
  }


  if (filter_error) {
    return <Error />
  }

  if (rooms.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry, no rooms matched your search
      </h5>
    )
  }

  if (grid_view === false) {
    return <RoomListView rooms={rooms} />
  }

  return <RoomGridView rooms={rooms} />
}

export default RoomList
