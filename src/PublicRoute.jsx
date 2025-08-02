import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthUserApi } from './store/Reducers/AuthUserReducer';

function PublicRoute() {
    const AuthUser = useSelector((state)=> state.fetchSidebarReducer)
    const dispatch = useDispatch()

    console.log({AuthUser})
    useEffect(() => {
      dispatch(AuthUserApi())
    }, [])

      // if (AuthUser.data) return <Navigate to="/" />;
    
  return (
    <Outlet/>
  )
}

export default PublicRoute