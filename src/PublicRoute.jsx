import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthUserApi } from './store/Reducers/AuthUserReducer';

function PublicRoute() {
    const AuthUser = useSelector((state)=> state.AuthUserReducer)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(AuthUserApi())
    }, [])
    //  if (AuthUser.isError || !AuthUser.data.success) return <Navigate to="/" />;
    
  return (
    <Outlet/>
  )
}

export default PublicRoute