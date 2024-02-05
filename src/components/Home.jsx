import React from "react";
import SideBar from "./SideBar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <SideBar></SideBar>
      <Footer></Footer>
    </div>
  );
}
