import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import './App.css'
import RestaurantDetails from './Pages/RestaurantDetail'
import { Footer } from './Components/Footer'
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/accesso/login" element={<Login />} />
        <Route path="/accesso/registrati" element={<Register />} />
        <Route path="/dettaglio/:id" element={<RestaurantDetails />} />
        <Route path="/conferma-ordine" element={<OrderConfirmation />} />
        <Route path="/ordine-confermato" element={<OrderConfirmation />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 