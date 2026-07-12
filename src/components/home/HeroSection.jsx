import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import logoC3D from "../../../imagen/logoc3dimpresiones.png";

const HERO_IMAGE = "https://media.base44.com/images/public/6a3327967c8e14241648acf7/db3b2fbce_generated_d6de8f01.png";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2">
              <img
                src={logoC3D}
                alt="HolaC3D"
                className="h-12 w-auto rounded-lg"
              />
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1] tracking-tight">
              Impresiones 3D{" "}
              <span className="relative">
                <span className="relative z-10 text-[#7CB9E8]">únicas</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-1 left-0 w-full h-3 bg-[#A8D8EA]/30 rounded-full -z-0 origin-left"
                />
              </span>{" "}
              y personalizadas
            </h1>

            <p className="text-ink/60 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Creamos piezas únicas impresas en 3D con amor y atención al detalle. 
              Desde llaveros cutie hasta decoración para tu hogar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-btn-blue hover:bg-btn-blue-dark text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#7CB9E8]/25 text-sm"
              >
                <ArrowDown className="w-4 h-4" />
                Ver catálogo
              </Link>
              <a
                href="https://wa.me/5491136176535?text=Hola C.3.D Impresiones! Quiero consultar sobre sus productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm border border-white/40 text-ink font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-white/70 hover:shadow-lg text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Escribirme por WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 justify-center lg:justify-start">
              {[
               // { num: "100+", label: "Piezas creadas" },
                { num: "100%", label: "Personalizable" },
                { num: "❤️", label: "Hecho con amor" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading font-black text-xl text-ink">{stat.num}</div>
                  <div className="text-xs text-ink/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#A8D8EA]/20">
              <img
                src={HERO_IMAGE}
                alt="Impresiones 3D artesanales en colores pastel"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-3 shadow-xl"
            >
              <span className="text-sm font-bold text-ink">🎨 +50 colores disponibles</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}