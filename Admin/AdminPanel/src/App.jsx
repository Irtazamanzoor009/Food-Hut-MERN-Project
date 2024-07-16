import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login/Login'
import Mainpage from './components/MainPage/Mainpage';
import Users from './components/Users/Users';
import Contact from './components/Contact/Contact'


function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/mainpage" element={<Mainpage/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/contacts" element={<Contact/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
