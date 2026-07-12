import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VisualBackground from "./VisualBackground";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <VisualBackground />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}