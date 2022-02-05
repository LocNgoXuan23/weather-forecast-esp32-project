import React from 'react'
import styled from 'styled-components'
import { RoomsSort, PageHero, RoomList, RoomFilters } from '../components'

const RoomsPage = () => {
  return <main>
    <PageHero title="rooms" />
    <Wrapper className="page">
      <div className="section-center products">
        <RoomFilters />
        <div>
          <RoomsSort />
          <RoomList />
        </div>
      </div>
    </Wrapper>
  </main>
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default RoomsPage
