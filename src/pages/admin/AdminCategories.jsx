import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DEFAULT_CATEGORIES, uniqueCategories } from "@/lib/defaultCategories";

export default function AdminCategories() {
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => base44.entities.Category.list("-created_date"),
    initialData: [],
  });

  const existingNames = useMemo(
    () => new Set((categories || []).map((c) => c?.nombre?.trim()).filter(Boolean)),
    [categories]
  );

  useEffect(() => {
    if (isLoading) return;
    const missing = uniqueCategories(DEFAULT_CATEGORIES).filter((name) => !existingNames.has(name));
    if (missing.length === 0) return;

    (async () => {
      try {
        await Promise.all(missing.map((nombre) => base44.entities.Category.create({ nombre })));
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      } catch (e) {
        console.error("No se pudieron sembrar categorías por defecto", e);
      }
    })();
  }, [isLoading, existingNames, queryClient]);

  const createMut = useMutation({
    mutationFn: ({ nombre }) => base44.entities.Category.create({ nombre }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      setNewName("");
      toast.success("Categoría creada");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id) => base44.entities.Category.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Categoría eliminada");
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createMut.mutate({ nombre: newName.trim() });
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-white mb-6">Categorías</h2>

      <form onSubmit={handleCreate} className="flex gap-3 mb-8 max-w-md">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nueva categoría..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
        />
        <Button type="submit" className="bg-[#7CB9E8] hover:bg-[#5DA8E0] text-white flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Agregar
        </Button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <p className="text-white/40 text-sm">No hay categorías creadas</p>
      ) : (
        <div className="space-y-2 max-w-md">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 group">
              <span className="text-white text-sm font-medium">{cat.nombre}</span>
              <button
                onClick={() => {
                  if (confirm("¿Eliminar esta categoría?")) deleteMut.mutate(cat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 transition"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}