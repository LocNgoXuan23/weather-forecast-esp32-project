import React from 'react'
import styled from 'styled-components'
import Room from './Room'

const RoomGridView = ({ rooms }) => {
  return <Wrapper>
    <div className="products-container">
      {rooms.map((room) => {
        return <Room key={room.id} {...room} />
      })}
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default RoomGridView
