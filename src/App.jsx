import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { AuthPage } from './pages/AuthPage'
import { CartPage } from './pages/CartPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  

  return (
    <BrowserRouter>
     <Routes>
       <Route index element={<MainPage />}/>
       <Route path="/about" element={<AboutPage />}/>  
       <Route path="/AuthPage" element={<AuthPage />}/>
       <Route path="/cart" element={<CartPage/>}/>
       <Route path="*" element={<NotFoundPage/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
