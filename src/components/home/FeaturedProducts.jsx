import React from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/catalog/ProductCard";
import ProductSkeleton from "@/components/catalog/ProductSkeleton";

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => base44.entities.Product.filter({ destacado: true }, "-created_date", 6),
    initialData: [],
  });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7CB9E8] font-heading">
            Lo más popular
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-black text-ink">
            Productos destacados
          </h2>
          <p className="mt-3 text-ink/50 max-w-md mx-auto">
            Nuestras piezas más solicitadas, creadas con la mejor calidad de impresión 3D.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading
            ? Array(3).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>

        {!isLoading && products.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7CB9E8] hover:text-[#3D405B] transition-colors group"
            >
              Ver todo el catálogo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}