import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Star, StarOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => base44.entities.Product.list("-created_date"),
    initialData: [],
  });

  const createMut = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setShowForm(false);
      toast.success("Producto creado exitosamente");
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Product.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditing(null);
      setShowForm(false);
      toast.success("Producto actualizado");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Producto eliminado");
    },
  });

  const toggleFeatured = async (product) => {
    await base44.entities.Product.update(product.id, { destacado: !product.destacado });
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
  };

  const handleSave = async (data) => {
    if (editing) {
      updateMut.mutate({ id: editing.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  if (showForm || editing) {
    return (
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-6">
          {editing ? "Editar producto" : "Nuevo producto"}
        </h2>
        <ProductForm
          product={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-white">Productos</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#7CB9E8] hover:bg-[#5DA8E0] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo producto
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-white/40">
          <p className="text-lg">No hay productos aún</p>
          <p className="text-sm mt-2">Crea tu primer producto para comenzar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 hover:bg-white/8 transition group"
            >
              {p.imagen_principal && (
                <img src={p.imagen_principal} alt={p.nombre} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">{p.nombre}</h3>
                <p className="text-white/40 text-xs mt-1">{p.categoria}</p>
              </div>
              <div className="text-white font-bold text-sm whitespace-nowrap">
                ${p.precio?.toLocaleString("es-AR")}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => toggleFeatured(p)}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  title={p.destacado ? "Quitar destacado" : "Destacar"}
                >
                  {p.destacado ? (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff className="w-4 h-4 text-white/30" />
                  )}
                </button>
                <button
                  onClick={() => { setEditing(p); setShowForm(true); }}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <Pencil className="w-4 h-4 text-white/50" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("¿Eliminar este producto?")) deleteMut.mutate(p.id);
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}