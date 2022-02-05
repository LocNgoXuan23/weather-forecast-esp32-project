import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = ({ items, removeItem, editItem, carts }) => {
  
  if (carts) {
    return <div className="grocery-list">
      {items.map((item) => {
        const { id, name, email, createdAt, user, userEmail, _id } = item
        return <article className="grocery-item" key={id ? id : _id}>
          <Link to={`/carts/${_id}`} className="title">
            id : {id ? id : _id} 
            {email && ` | email : ${email}`} 
            {name ? ` | name : ${name}` : ` | created at : ${formatDate(createdAt)} | user : ${userEmail ? userEmail : user}`}
          </Link>
          <div className="btn-container">
            <button type="button" className="delete-btn" onClick={() => removeItem(id ? id : _id)}>
              <FaTrash />
            </button>
          </div>
        </article>
      })}
    </div>
  }



  return <div className="grocery-list">
    {items.map((item) => {
      const { id, name, email, createdAt, user, userEmail, _id } = item
      return <article className="grocery-item" key={id ? id : _id}>
        <Wrapper className="title" onClick={() => editItem(id, name, email)}>
          id : {id ? id : _id} 
          {email && ` | email : ${email}`} 
          {name ? ` | name : ${name}` : ` | created at : ${formatDate(createdAt)} | user : ${userEmail ? userEmail : user}`}
        </Wrapper>
        <div className="btn-container">
          <button type="button" className="edit-btn" onClick={() => editItem(id, name, email)}>
            <FaEdit />
          </button>
          <button type="button" className="delete-btn" onClick={() => removeItem(id ? id : _id)}>
            <FaTrash />
          </button>
        </div>
      </article>
    })}
  </div>
}

const Wrapper = styled.p`
  cursor: pointer;
  
`

export default List
