import React from 'react'
import styled from 'styled-components'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiGithub } from 'react-icons/fi'

const Footer = () => {
  return <Wrapper>
    <h1>Sona</h1>
    <h5>We inspire and reach millions of travelers across 90 local websites</h5>
    <div className="footer-icon">
      <span className="icon"><FiFacebook /></span>
      <span className="icon"><FiTwitter /></span>
      <span className="icon"><FiInstagram /></span>
      <span className="icon"><FiYoutube /></span>
      <span className="icon"><FiGithub /></span>
    </div>
  </Wrapper>
}

const Wrapper = styled.footer`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: column;
  }
  h1 {
    color: white;
  }
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 50px;
  .footer-icon {
    margin-top: 15px;
  }
  .footer-icon span {
    margin: 0 10px;
    color: white;
    font-size: 40px;
  }
`

export default Footer
