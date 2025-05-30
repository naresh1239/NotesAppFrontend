import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import  Home  from './Home'
import EditNotes from './EditNotes'
import CreateNotes from './CreateNotes'
import ReadNotes from './ReadNotes'
import PublicPost from './PublicPost'
import LoginPage from './Auth/LoginPage'
import SignIn from './Auth/SignIn'
import OtpVerify from './Auth/OtpVerify'
import { useDispatch } from 'react-redux'
import { AuthUserApi } from './store/Reducers/AuthUserReducer'
import PublicRoute from './PublicRoute'

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthUserApi())
  }, [])
  
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<PublicRoute/>}>
    <Route path="/SiginToNotes" element={<SignIn/>} />
    <Route path="/LoginToNotes" element={<LoginPage/>} />
    <Route path="/OtpVerfiy/:mail" element={<OtpVerify/>} />
    <Route path="/readNotesPublic/:id" element={<PublicPost/>} />
    </Route>
   <Route element={<Layout/>}>
   <Route path="/" element={<Home />} />
   <Route path="/EditNotes/:id" element={<EditNotes />} />
   <Route path="/CreateNotes" element={<CreateNotes />} />
   <Route path="/readNotes/:id" element={<ReadNotes/>} />
  </Route>
  </Routes>
    </BrowserRouter>
  )
}

export default App