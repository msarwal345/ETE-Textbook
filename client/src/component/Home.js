import React from 'react'
import { useLocation } from 'react-router-dom'
import TextbookList from './Textbooklist/TextBooklist'
import NavScrollExample from './Navbar/Navbar'
import Topbar from './Navbar/Navbar'


export default function Home() {
  const location =useLocation()
  return (
    <div>
      {/* <h1>
        Hello {location.state.id} and welocome to the home
      </h1> */}
      {/* <Topbar/> */}
      <TextbookList/>
    </div>
  )
}
