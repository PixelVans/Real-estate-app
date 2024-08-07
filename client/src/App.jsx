import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import About from './assets/pages/About'
import Profile from './assets/pages/Profile'
import Header from './components/header'
import PrivateRoute from './components/privateRoute'
import CreateListing from './assets/pages/CreateListing'
import UpdateListing from './assets/pages/UpdateListing'
export default function App() {

  return (
    
    <BrowserRouter>
   <Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-up" element={<SignUp />} />
  <Route path="/about" element={<About />} />
  <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/create-listing" element={<CreateListing/>} />
    <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
  </Route>
</Routes>
</BrowserRouter>
    
  )
}
