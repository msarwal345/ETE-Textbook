import React from 'react'
import NavScrollExample from '../Navbar/Navbar'
import HeroSection from '../Herosec/Herosec'
import TextbookList from '../Textbooklist/TextBooklist'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div>
        <NavScrollExample/>
        <HeroSection/>
        <TextbookList/>
        <Footer/>

    </div>
  )
}
