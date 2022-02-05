import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useBookingContext } from '../context/booking_context'
import { useUserContext } from '../context/user_context'
import { Link } from 'react-router-dom'
import { PageHero, Loading, Error } from '../components'
import { formatDate } from '../utils/helpers'

const CartHistoryPage = () => {
  const { current_user_bookings: bookings, fetchCurrentUserBookings, current_user_bookings_loading, current_user_bookings_error } = useBookingContext()
  const { isLoading, error } = useUserContext()

  useEffect(() => {
    fetchCurrentUserBookings()
  }, [])

  if (current_user_bookings_loading || isLoading) {
    return <Loading />
  }
  if (current_user_bookings_error || error) {
    return <Error />
  }

  if (bookings.length < 1) {
    return <main>
      <PageHero title="booking" subtitle="history" />
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your booking history is empty</h2>
          <Link to="/" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper> 
    </main>
  }

  return <main>
    <PageHero title="booking" subtitle="history" />
    <Wrapper className="section section-center">
        {bookings.map((bookingItem, index) => {
          const { checkIn, checkOut, createdAt, guests, room, id } = bookingItem
          return <div key={id}>
            <h3>{index + 1}. {id}</h3>
            <h5>checkIn : {formatDate(checkIn)}</h5>
            <h5>checkOut : {formatDate(checkOut)}</h5>
            <h5>guests : {guests}</h5>
            <h5>room : {room}</h5>
            <h5>createdAt : {formatDate(createdAt)}</h5>
          </div>
        })}
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  p {
    display: flex;
  }
  h3 {
    color: var(--clr-primary-5);
  }
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
`

export default CartHistoryPage
