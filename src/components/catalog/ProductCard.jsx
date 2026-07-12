import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5491136176535";

export default function ProductCard({ product }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.nombre}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group bg-white/45 backdrop-blur-md border border-white/30 rounded-3xl p-4 hover:shadow-2xl hover:shadow-[#A8D8EA]/15 transition-shadow duration-500"
    >
      <Link to={`/producto/${product.id}`}>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/50">
          <img
            src={product.imagen_principal}
            alt={product.nombre}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {product.destacado && (
            <div className="absolute top-3 left-3 bg-[#FFD3B6] text-ink font-heading font-bold text-xs px-3 py-1.5 rounded-full">
              ⭐ Destacado
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#7CB9E8] font-heading">
          {product.categoria}
        </span>
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-lg font-heading font-bold text-ink hover:text-[#7CB9E8] transition-colors cursor-pointer">
            {product.nombre}
          </h3>
        </Link>
        <p className="text-ink/60 text-sm line-clamp-2 leading-relaxed">
          {product.descripcion_corta || product.descripcion}
        </p>

        {/* Colors */}
        {product.colores_disponibles?.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-xs text-ink/40 font-medium">Colores:</span>
            <div className="flex gap-1">
              {product.colores_disponibles.slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3">
          <span className="text-2xl font-heading font-black text-ink">
            ${product.precio?.toLocaleString("es-AR")}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 bg-btn-blue hover:bg-btn-blue-dark text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-all duration-300 hover:shadow-lg hover:shadow-[#7CB9E8]/25"
          >
            <MessageCircle className="w-4 h-4" />
            Pedir
          </a>
        </div>
      </div>
    </motion.div>
  );
}