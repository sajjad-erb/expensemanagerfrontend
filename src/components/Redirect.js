import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Redirect = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const client = useSelector((state) => state.auth.client);
  const uid = useSelector((state) => state.auth.uid);
  return accessToken && client && uid ? <Outlet /> : <Navigate to='/login' />
}

export default Redirect