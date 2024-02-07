import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from "./pages/HomePage.jsx";
import ParentComponent from "./pages/ParentComponent.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
