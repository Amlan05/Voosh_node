import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './index.css'
import './App.css'
import Auth from './Components/Auth'
import Navbar from './Components/Navbar'
import User from './Components/User'
import {useSelector} from "react-redux"
import { useDispatch } from 'react-redux';
import { userActions } from './Components/Store';

function App() {

  const dispatch = useDispatch()
  const [data, setData] = useState()

  useEffect( () => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }
  },[])

  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn)
  console.log("isuserLoggedIn", isUserLoggedIn)

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/auth' element={<Auth></Auth>}></Route>
      <Route path='/' element={<User></User>}></Route>
    </Routes>
    </>
  )
}

export default App
