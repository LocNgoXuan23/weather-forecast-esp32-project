import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import { Home, SingleRoom, SingleClass, Room, About, Readme, BookingHistory, Error, Login, Register, ChangePassword, AuthWrapper, PrivateRoute, AdminRoute, Admin, AdminUser, AdminRoom, AdminBooking } from './pages'

function App() {  
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path="/class/:id" children={<SingleClass />} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  )
}

export default App
