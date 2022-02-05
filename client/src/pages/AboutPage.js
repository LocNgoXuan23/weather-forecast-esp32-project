import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import about1 from '../assets/about1.jpeg'
import about2 from '../assets/about2.jpeg'
import about3 from '../assets/about3.jpeg'
import videoImg from '../assets/img-video.jpeg'
import { FaCheck, FaPlayCircle } from 'react-icons/fa'

const AboutPage = () => {
  return <main>
    <PageHero title="about" />
    <Wrapper className="page section section-center">
      <article className="title">
        <div className="title">
          <h2>Welcome To Sona.</h2>
          <div className="underline"></div>
        </div>
        <p>
          Built in 1910 during the Belle Epoque period, this hotel is located in the center of Paris, with easy access to the city’s tourist attractions. It offers tastefully decorated rooms.
        </p>
      </article>
      <article className="title title-checker">
        <p><span className="checker-icon"><FaCheck /></span> 20% Off On Accommodation.</p>
        <p><span className="checker-icon"><FaCheck /></span> Complimentary Daily Breakfast</p>
        <p><span className="checker-icon"><FaCheck /></span> 3 Pcs Laundry Per Day</p>
        <p><span className="checker-icon"><FaCheck /></span> Free Wifi.</p>
        <p><span className="checker-icon"><FaCheck /></span> Discount 20% On F&B</p>
      </article>
    </Wrapper>
    <ImageWrapper className="page section section-center section-image">
      <article className="title">
        <div className="about-img-container">
          <img src={about1} className="about-image" />
          <h3 className="desc-text">Restaurants Services</h3>
        </div>
      </article>
      <article className="title">
        <div className="about-img-container">
          <img src={about2} className="about-image" />
          <h3 className="desc-text">Travel & Camping</h3>
        </div>
      </article>
      <article className="title">
        <div className="about-img-container">
          <img src={about3} className="about-image" />
          <h3 className="desc-text">Event & Party</h3>
        </div>
      </article>
    </ImageWrapper>
    <VideoWrapper className="page section" style={{
      backgroundImage: `url("${videoImg}")`,
    }}>
      <div className="video-text">
        <h2>Discover Our Hotel & Services.</h2>
        <p>It S Hurricane Season But We Are Visiting Hilton Head Island</p>
        <a href="https://www.youtube.com/watch?v=EzKkl64rRbM" className="play-btn video-popup"><FaPlayCircle /></a>
      </div>
    </VideoWrapper>
  </main>
}

const VideoWrapper = styled.section`
  .video-text {
    text-align: center;
    color: white;
  }
  .video-text p {
    color: white;
  }
  .video-text a {
    color: var(--clr-primary-5);
    font-size: 90px;
  }
  margin-bottom: 150px;
  
`

const ImageWrapper = styled.section`
  .about-image {
    width: 100%;
  }
  .checker-icon {
    color: var(--clr-primary-5);
    margin-right: 10px;
  }
  .title-checker p {
    margin-top: 10px;
    font-size: 20px;
  }
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  display: flex;
  .about-img-container {
    position: relative;
  }
  .desc-text {
    position: absolute;
    bottom: 0px;
    color: white;
    left: 10px;
  }
  padding-top: 0rem;
`

const Wrapper = styled.section`
  .checker-icon {
    color: var(--clr-primary-5);
    margin-right: 10px;
  }
  .title-checker p {
    margin-top: 10px;
    font-size: 20px;
  }
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
