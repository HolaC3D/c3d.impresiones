import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Package, Star, LayoutGrid, DollarSign, Loader2 } from "lucide-react";

export default function AdminStats() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products-stats"],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories-stats"],
    queryFn: () => base44.entities.Category.list(),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
      </div>
    );
  }

  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.destacado).length;
  const totalCategories = categories.length;
  const avgPrice = totalProducts > 0
    ? (products.reduce((sum, p) => sum + (p.precio || 0), 0) / totalProducts).toFixed(0)
    : 0;

  // Products per category
  const byCategory = {};
  products.forEach((p) => {
    byCategory[p.categoria] = (byCategory[p.categoria] || 0) + 1;
  });

  const stats = [
    { label: "Total productos", value: totalProducts, icon: Package, color: "#7CB9E8" },
    { label: "Destacados", value: featuredCount, icon: Star, color: "#FFD3B6" },
    { label: "Categorías", value: totalCategories, icon: LayoutGrid, color: "#DCEDC1" },
    { label: "Precio promedio", value: `$${avgPrice}`, icon: DollarSign, color: "#F7D6E0" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-6">Estadísticas</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: stat.color + "20" }}>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-heading font-bold text-white mb-4">Productos por categoría</h3>
      <div className="space-y-3 max-w-lg">
        {Object.entries(byCategory).map(([cat, count]) => {
          const pct = totalProducts > 0 ? (count / totalProducts) * 100 : 0;
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">{cat}</span>
                <span className="text-white/40">{count}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: "#7CB9E8" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}