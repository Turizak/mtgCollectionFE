// @ts-nocheck

import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  const token = useLoaderData
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'EXPIRED') {
      localStorage.clear()
      navigate('/')
      return
    }
    const tokenDuration = getTokenDuration()


    setTimeout(()=>{
      localStorage.clear()
      navigate('/')
    }, tokenDuration)
  }, [token])

  return (
    <>
    <Outlet />
    </>
  )
}

export default RootLayout