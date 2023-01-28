import { FormEvent, useEffect, useState } from 'react';
import './chat.css'

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import Message from '../Messages/Message';
import generateId from '../../helpers/functions/generateId';

import io from 'socket.io-client';
import { LoggedUserType } from '../../App';

const socket = io('http://localhost:4444')

socket.on('connect', () => console.log('[IO] A new connection has been established!'))

type MessageType = {
    id: string,
    text: string,
    user: string,
    userId: string,
    date: Date
}


const initialMessages: MessageType[] = []

export default function Chat({loggedUser}: {loggedUser: LoggedUserType | {}}){
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageType[]>(initialMessages)

    useEffect(() => {
        socket.on('Chat.message', handleNewMessage)
        return () => socket.off('Chat.message', handleNewMessage)   
    },[messages])

    function handleNewMessage(newMessage: MessageType ){
        setMessages(prev => [...prev, newMessage])
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(!message.trim()){
            return 
        }

        sendMessage()
        setMessage('')
    }

    function sendMessage(){

        const newMessage = {
            text: message,
            user: (loggedUser as LoggedUserType).user,
            userId: (loggedUser as LoggedUserType).userId,
            id: generateId(),
            date: new Date()
        }

        socket.emit('Chat.message', newMessage)

    }

    return <div className="chat">
        <div className='chat__messages'>
            {messages.map(item => {
               return  <Message key={item.id} text={item.text} position={(loggedUser as LoggedUserType).userId === item.userId? 'right' : 'left'} sender={item.user} />
            })}
        </div>
        <form className='chat__form' onSubmit={handleSubmit}>
            <InputText autoFocus={true} value={message} onChange={e => setMessage(e.target.value)} className='form__input' />
            <Button className='form__button' label="Enviar" aria-label="Enviar" />
        </form>
    </div>
}