import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
//it is the main structure of page

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/*all page it shown  in it  */}
      <Footer />
    </>
  );
}
