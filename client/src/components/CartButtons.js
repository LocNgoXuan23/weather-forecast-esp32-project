import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import {  RiLogoutBoxRFill, RiLockPasswordFill, RiLoginBoxFill, RiRegisteredFill, RiAdminFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {
  const { closeSidebar } = useProductsContext()
  const { user, admin, handleLogoutSubmit } = useUserContext()

  return <Wrapper className="cart-btn-wrapper">
    {admin && 
      <Link to="/admin" type="button" className="auth-btn" onClick={closeSidebar}>
        Admin <RiAdminFill />
      </Link>
    }
    {user 
    ?
      <>
        <Link to="/" type="button" className="auth-btn" onClick={closeSidebar}>
          {user.name} <FaUserAlt />
        </Link>
        <Link to="/" type="button" className="auth-btn" onClick={() => {
          handleLogoutSubmit()
          closeSidebar()
        }}>
          logout <RiLogoutBoxRFill />
        </Link>
        <Link to="/changePassword" type="button" className="auth-btn" onClick={closeSidebar}>
          password <RiLockPasswordFill />
        </Link>
      </>
    :
      <>
        <Link to="/login" type="button" className="auth-btn" onClick={closeSidebar}>
          login <RiLoginBoxFill />
        </Link>
        <Link to="/register" type="button" className="auth-btn" onClick={closeSidebar}>
          register <RiRegisteredFill />
        </Link>
      </>
    }
    
    
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
    margin-left: 20px;
  }
`
export default CartButtons