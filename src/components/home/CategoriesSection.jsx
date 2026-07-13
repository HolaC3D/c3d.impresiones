import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, KeyRound, Home, Puzzle, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CATEGORIES, DEFAULT_CATEGORY_STYLES, uniqueCategories } from "@/lib/defaultCategories";

const ICONS = {
  BookOpen,
  KeyRound,
  Home,
  Puzzle,
  Sparkles,
};

export default function CategoriesSection() {
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["home-categories"],
    queryFn: () => base44.entities.Category.list("-created_date"),
    initialData: [],
  });

  const categories = useMemo(() => {
    const dbCategories = (categoriesData || []).map((c) => c?.nombre).filter(Boolean);
    const names = uniqueCategories([...DEFAULT_CATEGORIES, ...dbCategories]);

    return names.map((nombre) => {
      const style = DEFAULT_CATEGORY_STYLES[nombre];
      const Icon = style ? ICONS[style.icon] : Sparkles;
      const color = style?.color || "#7CB9E8";
      return { nombre, icon: Icon, color };
    });
  }, [categoriesData]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CB9E8] font-heading">
            Categorías
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-black text-ink">
            Explora nuestro mundo 3D
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.nombre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/catalogo?categoria=${encodeURIComponent(cat.nombre)}`}
                  className="group flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}40` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#3D405B" }} />
                  </div>
                  <span className="text-sm font-semibold text-ink text-center leading-tight">
                    {cat.nombre}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
