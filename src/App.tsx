import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import ControlPanel from './Pages/ControlPanel/ControlPanel'
import Dashboard from './Pages/ControlPanel/Dashboard'
import ControlPanelOrders from './Pages/ControlPanel/Orders'
import MenuBuilder from './Pages/ControlPanel/MenuBuilder'

// Componente per renderizzare il footer in modo condizionale
const ConditionalFooter = () => {
  const location = useLocation();
  
  // Non mostrare il footer se siamo nel pannello di controllo
  if (location.pathname.startsWith('/control-panel')) {
    return null;
  }
  
  return <Footer />;
};

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
        
        {/* Pannello di controllo ristoranti */}
        <Route path="/control-panel" element={<ControlPanel />}>
          <Route index element={<Dashboard />} />
          <Route path="ordini" element={<ControlPanelOrders />} />
          <Route path="menu" element={<MenuBuilder />} />
          <Route path="statistiche" element={<div className="p-4 bg-white rounded-lg shadow"><h1 className="text-2xl font-bold mb-4">Statistiche</h1><p>Pagina in costruzione</p></div>} />
          <Route path="impostazioni" element={<div className="p-4 bg-white rounded-lg shadow"><h1 className="text-2xl font-bold mb-4">Impostazioni</h1><p>Pagina in costruzione</p></div>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ConditionalFooter />
    </Router>
  )
}

export default App 