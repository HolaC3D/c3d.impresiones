import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import logoC3D from "../../../imagen/logoc3dimpresiones.png";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/30 backdrop-blur-sm bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src={logoC3D}
                alt="c.3.d. impresiones"
                className="h-16 w-auto rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-ink/60 text-sm leading-relaxed">
              Impresiones 3D únicas y personalizadas. Cada pieza es creada con amor y atención al detalle.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-ink text-sm uppercase tracking-widest">Navegación</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-ink/60 hover:text-[#7CB9E8] text-sm transition">Inicio</Link>
              <Link to="/catalogo" className="text-ink/60 hover:text-[#7CB9E8] text-sm transition">Catálogo</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-ink text-sm uppercase tracking-widest">Contacto</h4>
            <a
              href="https://wa.me/5491136176535?text=Hola C.3.D Impresiones! Quiero consultar sobre sus productos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-[#7CB9E8] transition"
            >
              <MessageCircle className="w-4 h-4" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink/40">
            © {new Date().getFullYear()} HolaC3D. Todos los derechos reservados.
          </p>
          <p className="text-xs text-ink/40 flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-[#F7D6E0] fill-[#F7D6E0]" /> y tecnología 3D
          </p>
        </div>
      </div>
    </footer>
  );
}