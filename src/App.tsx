import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import './App.css'
import RestaurantDetails from './Pages/RestaurantDetail'
import { Footer } from './Components/Footer'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/accesso/login" element={<Login />} />
        <Route path="/accesso/registrati" element={<Register />} />
        <Route path="/dettaglio/:id" element={<RestaurantDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 