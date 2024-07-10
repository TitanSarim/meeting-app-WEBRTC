import React, { useState, useEffect, useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSocket } from '../context/SocketProvide'


const LobbyScreen = () => {


  const naviagte = useNavigate()
  const socket = useSocket()


  const [email, setEmail] = useState('')
  const[room, setRoom] = useState('')


  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', {email, room})
  }, [email, room, socket])


  const handleJoinRoom = useCallback((data) => {
    const {email, room} = data
    naviagte(`/room/${room}`)
  }, [naviagte])

  useEffect(() => {
    socket.on('room:join', handleJoinRoom)

    return() => {
      socket.off('room:join', handleJoinRoom)
    }

  }, [handleJoinRoom, socket])



  return (
    <form onSubmit={handleFormSubmit} className='home-page-container'>

        <div>
            <p>Your email</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your email here' required/>
        </div>

        <div>
            <p>Room code</p>
            <input value={room} onChange={(e) => setRoom(e.target.value)} type='text' placeholder='Enter room code' required/>
        </div>
        <button type='submit'>Enter room</button>

    </form>
  )
}

export default LobbyScreen