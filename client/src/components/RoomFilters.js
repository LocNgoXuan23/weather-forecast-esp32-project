import React from 'react'
import styled from 'styled-components'
import { useRoomsContext } from '../context/rooms_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'

const Filters = () => {
  const {
    filters: {
      name, featured, service, max_size, min_size, size, min_price, max_price, price,
    },
    updateFilters,
    clearFilters, 
    all_rooms,
  } = useRoomsContext()

  const services = getUniqueValues(all_rooms, 'services')

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* search input */}
        <div className="form-control">
          <input
            type="text"
            name="name"
            placeholder="search"
            className="search-input"
            value={name}
            onChange={updateFilters}
          />
        </div>
        {/* end search input */}
        {/* services */}
        <div className="form-control">
          <h4>service</h4>
          <div>
            {services.map((c, index) => {
              return <button 
                key={index} 
                onClick={updateFilters}
                type="button"
                name="service" 
                className={`${service === c.toLowerCase() ? 'active' : null}`}
              >{c}</button>
            })}
          </div>
        </div>
        {/* end of services */}
        {/* size */}
        <div className="form-control">
          <h5>size</h5>
          <p className="price">{formatPrice(size)}</p>
          <input
            type="range"
            name="size"
            onChange={updateFilters}
            min={min_size}
            max={max_size}
            value={size}
          />
        </div>
        {/* end of size */}
        {/* price */}
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            onChange={updateFilters}
            min={min_price}
            max={max_price}
            value={price}
          />
        </div>
        {/* end of price */}
        {/* featured */}
        <div className="form-control shipping">
          <label htmlFor="featured"> featured</label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
            onChange={updateFilters} 
            checked={featured}
          />
        </div>
        {/* end of featured */}
      </form>
      <button type="button" className="clear-btn" onClick={clearFilters}>
        clear filters
      </button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
