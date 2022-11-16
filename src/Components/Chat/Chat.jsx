import React from "react";
import { useState, useEffect } from "react";
import io from 'socket.io-client'


export const Chat = () => {

    const socket = io('http://localhost:3001')

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newMessage = {
            body: message,
            from: 'Me'
        }
        socket.emit('message', message)
        setMessages([ newMessage,...messages ])
        setMessage('')
        
    }

    useEffect(() => {

        const reciveMessage = (message) => {
            setMessages([ message, ...messages ])
        }
        socket.on('message', reciveMessage)

        return () => {
           socket.off('message', reciveMessage) 
        }

    }, [messages])

    return (
        <div className="h-screen bg-slate-400 text-white flex items-center justify-center">
            
            <form onSubmit={handleSubmit} className='bg-blue-500 p-10 rounded w-4/12'>
                <h1 className="text-2x1 font-bold my-2">Room</h1>
                <input type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    className='border-2 border-zinc-500 text-black w-full'
                />
                {/* <button className="bg-blue-500">Send</button> */}

                <ul className="h-80 overflow-y-auto">
                    {
                        messages.map((message, index) => {
                            return (
                                <li key={index} className={`my-2 p-2 text-sm table rounded-md ${message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"}`}>
                                    <p>{message.from}: {message.body}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </form>
        </div>
    );
};