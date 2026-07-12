import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoC3D from "../../../imagen/logoc3dimpresiones.png";

const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Catálogo", path: "/catalogo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoC3D}
              alt="c.3.d. impresiones"
              className="h-12 w-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body font-semibold text-sm tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? "text-[#7CB9E8]"
                    : "text-ink/70 hover:text-[#7CB9E8]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/5491136176535?text=Hola C.3.D Impresiones! Quiero consultar sobre sus productos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-btn-blue hover:bg-btn-blue-dark text-white font-semibold text-sm px-5 py-2.5 rounded-2xl transition-all hover:shadow-lg hover:shadow-[#7CB9E8]/20"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl hover:bg-white/50 transition"
          >
            {open ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-white/80 border-b border-white/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold text-sm transition ${
                    location.pathname === link.path
                      ? "bg-[#A8D8EA]/20 text-[#7CB9E8]"
                      : "text-ink/70 hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5491136176535?text=Hola C.3.D Impresiones! Quiero consultar sobre sus productos"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-btn-blue text-white font-semibold text-sm px-5 py-3 rounded-2xl mt-2"
              >
                Escribirme por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}