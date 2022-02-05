import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { RoomsProvider } from './context/rooms_context'
import { BookingProvider } from './context/booking_context'
import { UserProvider } from './context/user_context'
import { AdminUserProvider } from './context/admin_user_context'
import { AdminRoomProvider } from './context/admin_room_context'
import { AdminBookingProvider } from './context/admin_booking_context'

ReactDOM.render(
    <UserProvider>
        <AdminBookingProvider>
            <AdminRoomProvider>
                <AdminUserProvider>
                    <BookingProvider>
                        <RoomsProvider>
                            <ProductsProvider>
                                <App />
                            </ProductsProvider>
                        </RoomsProvider>
                    </BookingProvider>
                </AdminUserProvider>
            </AdminRoomProvider>
        </AdminBookingProvider>
    </UserProvider>,
    document.getElementById('root')
)
