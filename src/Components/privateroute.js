import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {

    const location = useLocation()

    const token = localStorage.getItem('Token');

  return (

    token === "Pass" ?
    <Outlet></Outlet>:

    <Navigate to="/login" state={{ from: location }} replace />
  )
}
