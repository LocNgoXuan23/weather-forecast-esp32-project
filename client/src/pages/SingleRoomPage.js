import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRoomsContext } from '../context/rooms_context'
import { rooms_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleRoomPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const {
    single_room_loading: loading, 
    single_room_error: error, 
    single_room: room,
    fetchSingleRoom
  } = useRoomsContext()

  useEffect(() => {
    fetchSingleRoom(`${rooms_url}${id}`)
  }, [id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }, [error])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const { name, price, description, id: sku, image } = room

  return <Wrapper>
    <PageHero title="rooms" subtitle={name} />
    <div className="section section-center page">
      <Link to="/rooms" className="btn">
        back to rooms
      </Link>
      <div className="product-center">
        <ProductImages image={image} />
        <section className="content">
          <h2>{name}</h2>
          <h5 className="price"> {formatPrice(price)}</h5>
          <p className="desc"> Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge</p>
          <p className="info">
            <span>SKU : </span>
            {sku}
          </p>
          <div className="info">
            <span>services : </span>
            {description.services.map((item, index) => {
              return (<p key={index}>{item}</p>)
            })}
          </div>
          <hr />
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleRoomPage
