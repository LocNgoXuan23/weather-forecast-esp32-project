import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Hero = () => {
  return <Wrapper className="section-center">
    <article className="content">
      <h1>
        <div className="about-us">
          about us <br />
        </div> <br />
        Intercontinental LA <br />
        Westlake Hotel
      </h1>
      <p>
        Sona.com is a leading online accommodation site. We’re passionate about travel. Every day, we inspire and reach millions of travelers across 90 local websites in 41 languages.
      </p>
      <p>
        So when it comes to booking the perfect hotel, vacation rental, resort, apartment, guest house, or tree house, we’ve got you covered.
      </p>
      <Link to="/about" className="btn hero-btn">
        read more
      </Link>
    </article>
    <article className="img-container">
      <img src="https://preview.colorlib.com/theme/sona/img/about/xabout-1.jpg.pagespeed.ic.Bd-M-rG6ki.webp" alt="nice table" className="main-img" />
      <img src="https://preview.colorlib.com/theme/sona/img/about/xabout-2.jpg.pagespeed.ic.jFCH95Md9r.webp" alt="person working" className="accent-img" />
    </article>
  </Wrapper>
}

const Wrapper = styled.section`
  .about-us {
    color: var(--clr-primary-5);
  }
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
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
      display: block;
      position: relative;
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
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
