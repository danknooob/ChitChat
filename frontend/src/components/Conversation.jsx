import React from 'react'
import Convo from './Convo'
import useGetConvo from '../hooks/useGetConvo'
import {getRandomEmoji} from '../utils/emojis.js'
export default function Conversation() {
  const {loading,conversations}=useGetConvo();
  console.log("CONVERSATIONS:" ,conversations)
  return (
    <>
        <div className='py-2 flex flex-col overflow-auto'>
            
        {conversations.map((conversation,idx)=>(
          <Convo
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx===conversation.length -1}/>
        ))}


            {loading ? <span className='loading loading-spinner mx-auto'></span>: null}
    </div>
    </>
  )
}
