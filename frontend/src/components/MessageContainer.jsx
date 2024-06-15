import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../zustand/useConversation.js';

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // console.log('Selected Conversation:', selectedConversation);
  useEffect(()=>{
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-slate-400 px-4 py-2 mb-2'>
            <span className='label-text text-white'>To:</span>
            <span className='text-white font-bold'>{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}
