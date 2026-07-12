import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";
import ProductSkeleton from "@/components/catalog/ProductSkeleton";

export default function Catalog() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("categoria") || null;
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
    initialData: [],
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.categoria === activeCategory;
      const matchSearch =
        !search ||
        p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CB9E8] font-heading">
            Todos nuestros productos
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-heading font-black text-ink">
            Catálogo 3D
          </h1>
          <p className="mt-3 text-ink/50 max-w-md mx-auto">
            Explorá nuestra colección de impresiones 3D únicas y personalizadas
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border-white/40 text-ink placeholder:text-ink/30 focus:bg-white/70 transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? Array(6).fill(0).map((_, i) => <ProductSkeleton key={`sk-${i}`} />)
              : filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </AnimatePresence>
        </div>

        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-xl text-ink">No encontramos productos</h3>
            <p className="text-ink/50 mt-2">Intentá con otra categoría o término de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}