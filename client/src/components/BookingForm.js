import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroSlider1 from '../assets/hero-slider-1.jpeg'
import heroSlider2 from '../assets/hero-slider-2.jpeg'
import heroSlider3 from '../assets/hero-slider-3.jpeg'
import { useBookingContext } from '../context/booking_context'
import { useUserContext } from '../context/user_context'
import DatePicker from 'react-date-picker'

const imageData = [
  heroSlider1,
  heroSlider2,
  heroSlider3
]

const BookingForm = () => {
  const { 
    check_in,
    check_out,
    guests,
    room,
    submit_loading,
    updateBookingForm,
    submitBookingForm,
    is_show_booking_alert: isShowAlert,
    booking_alert: bookingAlert,
    booking_alert_state: bookingAlertState,
    clearAlert,
  } = useBookingContext()
  const [backgroundImages, setBackgroundImage] = useState(imageData)
  const [mainBackgroundImage, setMainBackgroundImage] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const { user } = useUserContext()

  useEffect(() => {
    if (isShowAlert) {
      setTimeout(() => {
        clearAlert()
      }, 3000)
    }
  }, [isShowAlert])

  useEffect(() => {
    let slider = setInterval(() => {
      setMainBackgroundImage((oldIndex) => {
        if (oldIndex + 1 > backgroundImages.length - 1) {
          return 0
        } else {
          return oldIndex + 1
        }
      })
    }, 3000)
    return () => clearInterval(slider)
  }, [mainBackgroundImage])

  useEffect(() => {
    updateBookingForm('', 'check_in', checkIn)
  }, [checkIn])

  useEffect(() => {
    updateBookingForm('', 'check_out', checkOut)
  }, [checkOut])

  const clearForm = () => {
    setCheckIn('')
    setCheckOut('')
  }


  return <>
    <ImageBackgoundWrapper style={{
      backgroundImage: `url("${backgroundImages[mainBackgroundImage]}")`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Wrapper className="section-center">
        <article className="content">
          <h1>
            Sona A Luxury <br />
            Hotel
          </h1>
          <p className="booking-form-text">
            Here are the best hotel booking sites, including recommendations for international travel and for finding low-priced hotel rooms.
          </p>
          <Link to="/rooms" className="btn hero-btn">
            discover now
          </Link>
        </article>
        <article className="img-container">
          <div className="booking-form">
            <h3>Booking Your Hotel</h3>
            <form onSubmit={(e) => {
              submitBookingForm(e)
              clearForm()
            }}>
              <div className="check-date">
                <label htmlFor="date-in">Check In:</label>
                <DatePicker
                  type="text"
                  name="check_in"
                  className="date-picker"
                  id="date-in"
                  value={checkIn}
                  onChange={setCheckIn}
                />
              </div>
              <div className="check-date">
                <label htmlFor="date-in">Check In:</label>
                <DatePicker
                  type="text"
                  name="check_out"
                  className="date-picker"
                  id="date-in"
                  value={checkOut}
                  onChange={setCheckOut}
                />
              </div>
              <div className="select-option">
                <label htmlFor="guest">Guests:</label>
                <select name="guests" value={guests} onChange={updateBookingForm}>
                  <option value="2 adults">2 Adults</option>
                  <option value="3 adults">3 Adults</option>
                </select>
              </div>
              <div className="select-option">
                <label htmlFor="room">Room:</label>
                <select name="room" value={room} onChange={updateBookingForm}>
                  <option value="1 room">1 Room</option>
                  <option value="2 room">2 Room</option>
                </select>
              </div>
              {isShowAlert && 
                <p className={`form-alert ${bookingAlertState === 'warring' ? 'warring' : 'success'}`}>{bookingAlert}</p>
              }
              {!user ?
                <Link to='/login' type="button" className="btn btn-block submit-btn">
                  Login
                </Link>
              :
                submit_loading ?
                  <p className="submit-loading">Loading....</p>
                :
                  <button type="submit" className='btn btn-block submit-btn' onClick={(e) => {
                    submitBookingForm(e)
                    clearForm()
                  }}>
                    Check Availability
                  </button>
              }
            </form>
          </div>
        </article>
      </Wrapper>
    </ImageBackgoundWrapper>
  </>
}


const ImageBackgoundWrapper = styled.div`
`

const Wrapper = styled.section`
  h1 {
    color: white;
  }
  .booking-form-text {
    color: white;
  }
  form {
    background-color: var(--clr-primary-5);
  }

  form label {
    display: block;
  }

  form input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 18px;
  }

  .date-picker {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 18px;
    background-color: white;
    border-color: white;

  }
  .react-date-picker__wrapper {
    border: thin solid white;
  }

  form select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 18px;
  }

  form select option {
    height: 40px;
  }

  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: block;
    width: 100%;
    background-color: var(--clr-primary-5);
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  
  .form-alert.warring {
    color: red;
  }
  .form-alert.success {
    color: green;
  }

  .submit-loading {
    color: white;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      margin-top: 30px;
      margin-bottom: 30px;
      display: block;
      width: 360px;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .booking-form {
      width: 100%;
      bottom: -170px;
      left: 78px;
    }
    .booking-form form div {
      margin-bottom: 30px;
    }
  }
`

export default BookingForm
