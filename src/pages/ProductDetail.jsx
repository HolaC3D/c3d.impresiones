import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/catalog/ProductCard";

const WHATSAPP_NUMBER = "5491100000000";

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = window.location.pathname.split("/producto/")[1];
  const [currentImage, setCurrentImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.categoria],
    queryFn: () =>
      base44.entities.Product.filter(
        { categoria: product.categoria },
        "-created_date",
        4
      ),
    enabled: !!product?.categoria,
    initialData: [],
  });

  const allImages = product
    ? [product.imagen_principal, ...(product.galeria || [])].filter(Boolean)
    : [];

  const related = relatedProducts.filter((p) => p.id !== product?.id).slice(0, 3);

  const whatsappUrl = product
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.nombre}`)}`
    : "#";

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-3xl bg-[#A8D8EA]/10" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 bg-[#A8D8EA]/10" />
            <Skeleton className="h-10 w-3/4 bg-[#A8D8EA]/10" />
            <Skeleton className="h-4 w-full bg-[#A8D8EA]/10" />
            <Skeleton className="h-4 w-2/3 bg-[#A8D8EA]/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">😢</div>
        <h2 className="font-heading font-bold text-2xl text-ink">Producto no encontrado</h2>
        <Link to="/catalogo" className="mt-4 inline-block text-[#7CB9E8] font-semibold text-sm">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-[#7CB9E8] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/50">
              <img
                src={allImages[currentImage]}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p === 0 ? allImages.length - 1 : p - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-ink" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p === allImages.length - 1 ? 0 : p + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition"
                  >
                    <ChevronRight className="w-5 h-5 text-ink" />
                  </button>
                </>
              )}
              {product.destacado && (
                <div className="absolute top-4 left-4 bg-[#FFD3B6] text-ink font-heading font-bold text-xs px-3 py-1.5 rounded-full">
                  ⭐ Destacado
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                      i === currentImage ? "border-[#7CB9E8]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:sticky lg:top-24 lg:self-start"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#7CB9E8] font-heading">
                {product.categoria}
              </span>
              <h1 className="mt-2 text-3xl md:text-4xl font-heading font-black text-ink">
                {product.nombre}
              </h1>
            </div>

            <div className="text-3xl font-heading font-black text-ink">
              ${product.precio?.toLocaleString("es-AR")}
            </div>

            <div className="text-ink/60 leading-relaxed whitespace-pre-line">
              {product.descripcion}
            </div>

            {/* Colors */}
            {product.colores_disponibles?.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-sm text-ink">Colores disponibles</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colores_disponibles.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-btn-blue hover:bg-btn-blue-dark text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#7CB9E8]/25 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </a>

            <p className="text-center text-xs text-ink/40">
              Te responderemos lo antes posible 💬
            </p>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-heading font-black text-ink mb-8">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}