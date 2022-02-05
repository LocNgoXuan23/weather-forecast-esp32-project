import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useAdminRoomContext } from '../context/admin_room_context'
import Error from '../components/Error'
import Loading from '../components/Loading'
import List from '../components/List'
import Alert from '../components/Alert'

const AdminRoomPage = () => {
  const { fetchAllRooms, all_rooms_loading: loading, all_rooms_error: error, all_rooms: rooms, showAlert, alert, name, price, size, capacity, services, bed, image, featured, updateForm, handleSubmit, removeRoom, removeAllRooms, updateEdit, action_status, clearForm } = useAdminRoomContext()

  useEffect(() => {
    fetchAllRooms()
    clearForm()
  }, [])


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }


  return <main>
    <PageHero title="admin" subtitle="room" />
    <ReadmeWrapper className="readme form">
      <p>- Bạn có thể thêm, bới, sửa, xóa (hoặc xóa toàn bộ rooms - không khuyến khích ^_^)</p> 
    </ReadmeWrapper>
    <Wrapper className="section section-center">
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={rooms} />}
          <h3>Admin Room</h3>
          <div className="form-control">
            <div className="input-container">
              <input type="text" className='grocery' name="name" placeholder='enter name' value={name} onChange={updateForm}/>
              <input type="text" className='grocery' name="price" placeholder='enter price' value={price} onChange={updateForm}/>
              <input type="text" className='grocery' name="size" placeholder='enter size' value={size} onChange={updateForm}/>
              <input type="text" className='grocery' name="capacity" placeholder='enter capacity' value={capacity} onChange={updateForm}/>
              <input type="text" className='grocery' name="services" placeholder='enter services' value={services} onChange={updateForm}/>
              <input type="text" className='grocery' name="bed" placeholder='enter bed' value={bed} onChange={updateForm}/>
              <input type="text" className='grocery' name="image" placeholder='enter image' value={image} onChange={updateForm}/>
              <input type="text" className='grocery' name="featured" placeholder='enter featured' value={featured} onChange={updateForm}/>
            </div>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              {action_status}
            </button>
          </div>
        </form>
        <div className="grocery-container">
        <List items={rooms} removeItem={removeRoom} editItem={updateEdit} />
          {rooms.length > 0 && (
            <button className="clear-btn" onClick={removeAllRooms} >
              clear room
            </button>
          )}
        </div>
      </section>
    </Wrapper>
  </main>
}

const ReadmeWrapper = styled.div`
  margin-bottom: 0px;
`

const Wrapper = styled.section`
  .grocery-selector {
    padding: 0.25rem;
    padding-left: 1rem;
    background: var(--clr-grey-10);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    border-color: transparent;
    font-size: 1rem;
    color: var(--clr-grey-5);
    margin-bottom: 0.5rem;
  }
  .action-state-option {
    display: flex;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  .input-container input {
    margin-bottom: 10px;
  }
  .section-center {
    background: var(--clr-white);
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
    transition: var(--transition);
    padding: 2rem;
    width: 80%;
  }
  .section-center:hover {
    box-shadow: var(--dark-shadow);
  }
  .alert {
    margin-bottom: 1rem;
    height: 1.25rem;
    display: grid;
    align-items: center;
    text-align: center;
    font-size: 0.7rem;
    border-radius: 0.25rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
  }
  .alert-danger {
    color: #721c24;
    background: #f8d7da;
  }
  .alert-success {
    color: #155724;
    background: #d4edda;
  }
  .grocery-form h3 {
    color: var(--clr-primary-1);
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .form-control {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .grocery {
    padding: 0.25rem;
    padding-left: 1rem;
    background: var(--clr-grey-10);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    border-color: transparent;
    font-size: 1rem;
    flex: 1 0 auto;
    color: var(--clr-grey-5);
  }
  .grocery::placeholder {
    font-family: var(--ff-secondary);
    color: var(--clr-grey-5);
  }
  .submit-btn {
    background: var(--clr-primary-8);
    border-color: transparent;
    flex: 0 0 5rem;
    display: grid;
    align-items: center;
    padding: 0.25rem;
    text-transform: capitalize;
    letter-spacing: 2px;
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    cursor: pointer;
    content: var(--clr-primary-5);
    transition: var(--transition);
    font-size: 0.85rem;
  }
  .submit-btn:hover {
    background: var(--clr-primary-5);
    color: var(--clr-white);
  }

  .grocery-container {
    margin-top: 2rem;
  }

  .grocery-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    transition: var(--transition);
    padding: 0.25rem 1rem;
    border-radius: var(--radius);
    text-transform: capitalize;
  }
  .grocery-item:hover {
    color: var(--clr-grey-5);
    background: var(--clr-grey-10);
  }
  .grocery-item:hover .title {
    color: var(--clr-grey-5);
  }
  .title {
    margin-bottom: 0;
    color: var(--clr-grey-1);
    letter-spacing: 2px;
    transition: var(--transition);
  }
  .edit-btn,
  .delete-btn {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    font-size: 0.7rem;
    margin: 0 0.15rem;
    transition: var(--transition);
  }
  .edit-btn {
    color: var(--clr-green-light);
  }
  .edit-btn:hover {
    color: var(--clr-green-dark);
  }
  .delete-btn {
    color: var(--clr-red-light);
  }
  .delete-btn:hover {
    color: var(--clr-red-dark);
  }
  .clear-btn {
    text-transform: capitalize;
    width: 10rem;
    height: 1.5rem;
    display: grid;
    align-items: center;
    background: transparent;
    border-color: transparent;
    color: var(--clr-red-light);
    margin: 0 auto;
    font-size: 0.85rem;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    margin-top: 1.25rem;
  }
  .clear-btn:hover {
    color: var(--clr-red-dark);
  }
  padding-top: 10px;
`
export default AdminRoomPage
