import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import About from './assets/pages/About'
import Profile from './assets/pages/Profile'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}
