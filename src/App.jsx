import React, { useEffect } from 'react'
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import {store} from '../src/store/store' 

const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./Home'));
const EditNotes = lazy(() => import('./EditNotes'));
const CreateNotes = lazy(() => import('./CreateNotes'));
const ReadNotes = lazy(() => import('./ReadNotes'));
const PublicPost = lazy(() => import('./PublicPost'));
import LoginPage from './Auth/LoginPage'
const SignIn = lazy(() => import('./Auth/SignIn'));
const OtpVerify = lazy(() => import('./Auth/OtpVerify'));
import PublicRoute from './PublicRoute'
import { AuthUserApi } from './store/Reducers/AuthUserReducer'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

const AppRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthUserApi())
  }, [])

  const linerProgressStyle =()=> {
   return <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/SiginToNotes" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <SignIn />
            </React.Suspense>
          } />
          <Route path="/LoginToNotes" element={<LoginPage />} />
          <Route path="/OtpVerfiy/:mail" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <OtpVerify />
            </React.Suspense>
          } />
          <Route path="/readNotesPublic/:id" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <PublicPost />
            </React.Suspense>
          } />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <Home />
            </React.Suspense>
          } />
          <Route path="/EditNotes/:id" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <EditNotes />
            </React.Suspense>
          } />
          <Route path="/CreateNotes" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <CreateNotes />
            </React.Suspense>
          } />
          <Route path="/readNotes/:id" element={
            <React.Suspense fallback={linerProgressStyle()}>
              <ReadNotes />
            </React.Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)

export default App
