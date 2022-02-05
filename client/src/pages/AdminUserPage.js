import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { Link } from 'react-router-dom'
import { useAdminUserContext } from '../context/admin_user_context'
import Error from '../components/Error'
import Loading from '../components/Loading'
import List from '../components/List'
import Alert from '../components/Alert'

const AdminUserPage = () => {
  const { fetchAdminAllUsers, all_users_loading: loading, all_users_error: error, all_users: users, name: name, email: email, password: password, action_state, updateUserForm, handleSubmit, alert, showAlert, removeUser, removeAllUsers, updateEdit, clearForm } = useAdminUserContext()


  useEffect(() => {
    fetchAdminAllUsers()
    clearForm()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return <main>
    <PageHero title="admin" subtitle="user" />
    <ReadmeWrapper className="readme form">
      <p>- Bạn có thể thêm, bới, sửa, xóa (hoặc xóa toàn bộ user - không khuyến khích ^_^)</p> 
      <p>- Đối với việc sửa 1 user bạn có nhiều lựa chọn : </p>
      <ul>
        <li>- Lựa chọn 1 : Chỉ sửa name, email, bỏ trống password thì user sẽ được sửa đổi name, email còn password vẫn như cũ</li>
        <li>- Lựa chọn 2 : Sửa toàn bộ name, email, password thì user sẽ được sửa đổi toàn bộ thông tin</li>
      </ul> 
    </ReadmeWrapper>
    <Wrapper className="section section-center">
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={users} />}
          <h3>Admin User</h3>
          <div className="form-control">
            <div className="input-container">
              <input type="text" className='grocery' name="name" value={name} placeholder='enter name' onChange={updateUserForm}/>
              <input type="email" className='grocery' name="email" value={email} placeholder='enter email' onChange={updateUserForm}/>
              <input type="password" className='grocery' name="password" value={password} placeholder='enter password' onChange={updateUserForm}/>
            </div>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              {action_state}
            </button>
          </div>
        </form>
        <div className="grocery-container">
          <List items={users} removeItem={removeUser} editItem={updateEdit} />
          {users.length > 0 && (
            <button className="clear-btn" onClick={removeAllUsers}>
              clear users
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
export default AdminUserPage
