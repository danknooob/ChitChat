import React from 'react'
import SearchInput from './SearchInput'
import Conversation from './Conversation'
import LogOutBtn from './LogOutBtn'
export default function SideBar() {
  return (
    <>
    <div className='border-r border-slate-800 p-4 flex flex-col'>
        <SearchInput/>
         <div className='divider px-3'></div>
         <Conversation/>
         <LogOutBtn/> 
    </div>
    </>
  )
}
