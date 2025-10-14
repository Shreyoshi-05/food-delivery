import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/about/About'
import Home from './components/home/Home'
import Nav from './components/nav/Nav'
// import { UseAppContext } from './components/context/AppContext'
import { UseAppContext } from './components/context/AppContext'
import Login from './components/popuplogin/Login'
import { Toaster } from 'react-hot-toast';
import Order from './components/order/Order'
import Verify from './verify/Verify'
import Cart from './components/cart/Cart'
import ShowOrders from './components/showorders/ShowOrders'
import Footer from './Footer'

const App = () => {
  const{popupOpen} = UseAppContext();

  return (
    <BrowserRouter>
    <Nav />
    <Toaster />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/order' element={<Order />}></Route>
      <Route path='/verify' element={<Verify />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/showorders' element={<ShowOrders />}></Route>
    </Routes>
    {popupOpen && <Login />}
    <Footer />
    </BrowserRouter>
  )
}

export default App