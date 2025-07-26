import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/home'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import { Toaster } from './components/ui/sonner'
import ProtectedRoutes from './components/ProtectedRoutes'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io, Socket } from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from './redux/store'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
const {user} = useSelector(store=>store.auth);
const dispatch = useDispatch();
const {socket} = useSelector(store => store.socketio);
  useEffect(() => {
    if(user)
    {
      const socketio = io('http://localhost:8000',{
        query : {
          userId : user?._id
        }, 
        transports:['websocket']
      });
      dispatch(setSocket(socketio));
      socketio.on('getOnlineUsers', (onlineUsers) =>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else {
      if (socket) socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);
  return (
    <>
      <Toaster/>
      <RouterProvider router={browserRouter} />
      
    </>
  )
}

export default App
