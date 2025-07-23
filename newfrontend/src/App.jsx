import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/home'
import MainLayout from './components/MainLayout'
import Profile from './Profile'
import { Toaster } from './components/ui/sonner'
import ProtectedRoutes from './components/ProtectedRoutes'
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/profile',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      // {
      //   path: '/account/edit',
      //   element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      // },
      // {
      //   path: '/chat',
      //   element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      // },
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

  return (
    <>
      <Toaster/>
      <RouterProvider router={browserRouter} />
      
    </>
  )
}

export default App
