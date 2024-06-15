import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import useLogout from '../hooks/useLogOut'
export default function LogOutBtn() {
  const {loading,logout}=useLogout();
  return (
    <>
    <div className='py-10 mt-auto'>
      {!loading ? (<BiLogOut className='w-6 h-6 text-black cursor-pointer' onClick={logout}
      />):
      <span className='loading loading-spinner'></span>}
    </div>
    </>
  )
}
