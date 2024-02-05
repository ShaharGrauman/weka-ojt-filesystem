import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from "./pages/HomePage.jsx";
import LogIn from "./pages/Login.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestPage from './pages/testOptions.jsx';

function App() {
  return (
  <div>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn LogIn="True" />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
      </div>
  )
}

export default App;