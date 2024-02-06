import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from "./pages/HomePage.jsx";
import ParentComponent from "./pages/ParentComponent.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import TestPage from "./pages/testOptions.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
