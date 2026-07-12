import React from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Todos",
  "Cuadernos personalizados",
  "Llaveros Cutie",
  "Decoración",
  "Accesorios",
  "Impresiones personalizadas",
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat || (cat === "Todos" && !active);
        return (
          <button
            key={cat}
            onClick={() => onChange(cat === "Todos" ? null : cat)}
            className="relative px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300"
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-btn-blue rounded-2xl shadow-lg shadow-[#7CB9E8]/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-white" : "text-ink/60 hover:text-ink"}`}>
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
}