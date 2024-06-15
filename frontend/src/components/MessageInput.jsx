import React,{useState} from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from '../hooks/useSendMessage';
import { set } from 'mongoose';

export default function MessageInput() {
  const [message,setMessage]=useState();
  const {loading,sendMessage}=useSendMessage()
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");

}
  return (
    <>
      <form className='relative px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input 
            type='text' 
            className='border text-sm rounded-lg block w-full p-2.5 bg-slate-400 border-gray-500 text-white placeholder-white' 
            placeholder='Type a message...' value={message} onChange={(e)=>setMessage(e.target.value)}
          />
          <button 
            type='submit' 
            className='absolute inset-y-0 right-0 flex items-center pr-3'>
           {loading ? <div className='loading loading-spinner'></div>:<BsSend className='text-white' />} 
          </button>
        </div>
      </form>
    </>
  );
}
