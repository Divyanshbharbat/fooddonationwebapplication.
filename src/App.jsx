import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import './App.css'
import About from './About.jsx'
import AdminPage from './AdminPage.jsx'
import Home from './Components/Home.jsx'
import History from './Components/History.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Adminlogin from './Components/Adminlogin.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import FoodDonationInfo from './Components/FoodDonationInfo.jsx'
import Contact from './Contact.jsx'
import Landing from './Components/Landing.jsx'
import Footer from './Footer.jsx'
import Leaderboard from './Components/Leaderboard.jsx'
const App = () => {
 
 


  const router=createBrowserRouter([
    {
      path:"/",
      element:<>
      <Navbar/>
    <Landing/>
      <Footer/>
      </>
    },{
      path:"/login",
      element:<>
      <Login/>
      </>
    },
    {

 path:"/signup",
 element:<>
<Signup/>
 </>

    },
   
   
   
    {
      path:'/home',
      element:<>
      <Navbar/>
      <Home/>
      <Footer/>
      </>
    },{
      path:'/donate',
      element:<>
      <Navbar/>
      <FoodDonationInfo/>
      <Footer/>
      </>
    },{
      path:"/history",
      element:<>
      <Navbar/>
      <History/>
      <Footer/>
      </>
    },{
      path:'/adminlogin',
      element:<>
      <Adminlogin/>
      </>
    },{
      path:"/adminpage",
      element:<>
      <Navbar/>
      <AdminPage/>
      <Footer/>
      </>
    },{
     path:"/about",
     element:
     <>
     <Navbar/>
     <About/>
     <Footer/>
     </>

    },{
      path:"/contact",
      element:<>
      <Navbar/>
      <Contact/>
      <Footer/>
      </>
    },{
      path:"/leaderboard",
      element:<>
      <Navbar/>
      <Leaderboard/>
      <Footer/>
      </>
    }
  
  
    
  ])
  return (
  <>
 <RouterProvider router={router} />
  
  </>
  )
}

export default App
