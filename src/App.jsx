import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { AuthPage } from './pages/AuthPage'
import { CartPage } from './pages/CartPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ConfigProvider } from 'antd'
import { router } from './utils/router'


function App() {


  

  return (
    <ConfigProvider theme={{ token: { borderRadius: 10 }}}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}




export default App