import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateAcc = () => {

    const location = useLocation()

    const token = localStorage.getItem('Token');

  return (

    token !== "Pass" ?
    <Outlet></Outlet>:

    <Navigate to="/logout" state={{ from: location }} replace />
  )
}