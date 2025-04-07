import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import './App.css'
import RestaurantDetails from './Pages/RestaurantDetail'
import { Footer } from './Components/Footer'
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation'
import Orders from './Pages/Orders/Orders'
import ProfilePage from './Pages/Personal/Profile'
import NotFound from './Pages/NotFound/NotFound'
import ScrollToTop from './Components/ScrollToTop'

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/accesso/login" element={<Login />} />
        <Route path="/accesso/registrati" element={<Register />} />
        <Route path="/dettaglio/:id" element={<RestaurantDetails />} />
        <Route path="/conferma-ordine" element={<OrderConfirmation />} />
        <Route path="/ordini" element={<Orders />} />
        <Route path="/profilo" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 