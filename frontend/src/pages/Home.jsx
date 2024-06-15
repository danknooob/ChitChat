import React from 'react';
import SideBar from '../components/SideBar';
// import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';
export default function Home() {
  return (
    <>
      <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
        <SideBar />
        <MessageContainer/>
      </div>
    </>
  );
}
