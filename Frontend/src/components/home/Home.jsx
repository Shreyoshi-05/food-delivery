import React from 'react'
import { UseAppContext } from '../context/AppContext'
import Login from '../popuplogin/Login';
import './home.css'
import Hero from './innerHome/Hero';
import Sections from './innerHome/Sections'
import CardSec from './innerHome/CardSec';

const Home = () => {

  return (
    <div className="home">
      <Hero />
      <Sections />
      <CardSec />
    </div>
  )
}

export default Home