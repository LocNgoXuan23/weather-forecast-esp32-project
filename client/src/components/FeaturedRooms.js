import React from 'react'
import { useRoomsContext } from '../context/rooms_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

const FeaturedRooms = () => {
  const { all_rooms_loading: loading, all_rooms_error: error, featured_rooms: featured } = useRoomsContext()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return <Wrapper className="section">
    <div className="title">
      <h2>featured rooms</h2>
      <div className="underline"></div>
    </div>
    <div className="section-center featured">
      {featured.map((product, index) => {
        if (index >= 3) return 
        return <Product key={product.id} {...product} />
      })}
    </div>
    <Link to="/rooms" className="btn">
      all rooms
    </Link>
  </Wrapper>
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedRooms
