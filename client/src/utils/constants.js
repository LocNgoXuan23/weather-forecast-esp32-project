import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'rooms',
    url: '/rooms',
  },
  {
    id: 3,
    text: 'about',
    url: '/about',
  },
  {
    id: 4,
    text: 'readme',
    url: '/readme',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'travel plan',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'catering service',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'babysitting',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    id: 4,
    icon: <GiStabbedNote />,
    title: 'laundry',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    id: 5,
    icon: <GiStabbedNote />,
    title: 'hire driver',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    id: 6,
    icon: <GiStabbedNote />,
    title: 'bar & drink',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
]

// product
export const products_url = '/api/v1/products'
export const single_product_url = '/api/v1/products/'
// room
export const rooms_url = '/api/v1/rooms/'
// booking
export const bookings_url = '/api/v1/bookings'
export const get_current_user_bookings_url = '/api/v1/bookings/showAllMyBookings'
// auth
export const login_url = '/api/v1/auth/login'
export const logout_url = '/api/v1/auth/logout'
export const register_url = '/api/v1/auth/register'
// user
export const use_showMe_url = '/api/v1/users/showMe'
export const update_password_url = '/api/v1/users/updateUserPassword'
// Cart
export const create_cart_url = '/api/v1/carts'
export const get_current_user_carts_url = '/api/v1/carts/showAllMyOrders'
export const carts_url = '/api/v1/carts'

// Admin User
export const get_all_users_url = '/api/v1/users'
export const create_user_url = '/api/v1/users'
export const users_url = '/api/v1/users'
export const edit_user_url = '/api/v1/users'
