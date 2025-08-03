import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthUserApi } from './store/Reducers/AuthUserReducer';
import Cookies from 'js-cookie';

function PublicRoute() {
    const AuthUser = useSelector((state)=> state.AuthUserReducer)
    const dispatch = useDispatch()
    const token = Cookies.get('isValidUserTime');

    useEffect(() => {
      dispatch(AuthUserApi())
    }, [])

  // console.log(token)
       if (token) return <Navigate to="/" />;
    
  return (
    <Outlet/>
  )
}

export default PublicRoute