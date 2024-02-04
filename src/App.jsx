import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import HomePage from "./pages/HomePage.jsx";
import LogIn from "./pages/Login.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
  <div>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
      </div>
  )
}

export default App
