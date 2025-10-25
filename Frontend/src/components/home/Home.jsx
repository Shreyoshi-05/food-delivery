import React, { useEffect, useState } from 'react'
import './home.css'
import Hero from './innerHome/Hero';
import Sections from './innerHome/Sections'
import CardSec from './innerHome/CardSec';

const Home = () => {
  const [pageHight , setPageHight] = useState(0);

  useEffect(()=>{
    function handelScroll (){

      let scrollhigth = Math.round(document.documentElement.scrollHeight);
      let scrolled = Math.round(window.scrollY);
      let shown = Math.round(window.innerHeight);
      let total = scrolled+shown;

      let per = Math.round(((total-shown) * 100)/(scrollhigth - shown));
      setPageHight(per);
    }

    window.addEventListener("scroll",handelScroll)

    return () => window.removeEventListener("scroll",handelScroll)
  },[]);

  return (
    <div className="page">
      <div className="line">
        <div style={{"width":`${pageHight}%`}} className="inner_line"></div>
      </div>
    <div className="home">
      <Hero />
      <Sections />
      <CardSec />
    </div>
    </div>
  )
}

export default Home