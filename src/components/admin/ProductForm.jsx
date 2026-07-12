import React, { useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Upload, Loader2 } from "lucide-react";

const DEFAULT_CATEGORIES = [
  "Cuadernos personalizados",
  "Llaveros Cutie",
  "Decoración",
  "Accesorios",
  "Impresiones personalizadas",
];

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    nombre: product?.nombre || "",
    descripcion: product?.descripcion || "",
    descripcion_corta: product?.descripcion_corta || "",
    precio: product?.precio || "",
    categoria: product?.categoria || "",
    imagen_principal: product?.imagen_principal || "",
    galeria: product?.galeria || [],
    colores_disponibles: product?.colores_disponibles || [],
    destacado: product?.destacado || false,
  });
  const [newColor, setNewColor] = useState("#A8D8EA");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: categoriesData = [] } = useQuery({
    queryKey: ["admin-categories-for-products"],
    queryFn: () => base44.entities.Category.list("-created_date"),
    initialData: [],
  });

  const categoryOptions = useMemo(() => {
    const dbCategories = (categoriesData || [])
      .map((c) => c?.nombre)
      .filter(Boolean);

    return dbCategories.length > 0 ? dbCategories : DEFAULT_CATEGORIES;
  }, [categoriesData]);

  const handleUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    if (field === "imagen_principal") {
      setForm((f) => ({ ...f, imagen_principal: file_url }));
    } else {
      setForm((f) => ({ ...f, galeria: [...f.galeria, file_url] }));
    }
    setUploading(false);
  };

  const removeGalleryImage = (index) => {
    setForm((f) => ({ ...f, galeria: f.galeria.filter((_, i) => i !== index) }));
  };

  const addColor = () => {
    if (newColor && !form.colores_disponibles.includes(newColor)) {
      setForm((f) => ({ ...f, colores_disponibles: [...f.colores_disponibles, newColor] }));
    }
  };

  const removeColor = (index) => {
    setForm((f) => ({ ...f, colores_disponibles: f.colores_disponibles.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, precio: parseFloat(form.precio) });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/70">Nombre</Label>
          <Input
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white/70">Precio</Label>
          <Input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Categoría</Label>
        <Select value={form.categoria} onValueChange={(v) => setForm((f) => ({ ...f, categoria: v }))}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Descripción corta</Label>
        <Input
          value={form.descripcion_corta}
          onChange={(e) => setForm((f) => ({ ...f, descripcion_corta: e.target.value }))}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
          placeholder="Breve descripción para la tarjeta"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Descripción completa</Label>
        <Textarea
          value={form.descripcion}
          onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[120px]"
          placeholder="Descripción detallada del producto"
        />
      </div>

      {/* Main image */}
      <div className="space-y-2">
        <Label className="text-white/70">Imagen principal</Label>
        <div className="flex items-center gap-4">
          {form.imagen_principal && (
            <img src={form.imagen_principal} alt="" className="w-20 h-20 rounded-xl object-cover" />
          )}
          <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl cursor-pointer text-white/70 text-sm transition">
            <Upload className="w-4 h-4" />
            {uploading ? "Subiendo..." : "Subir imagen"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, "imagen_principal")} />
          </label>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <Label className="text-white/70">Galería</Label>
        <div className="flex flex-wrap gap-3">
          {form.galeria.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
          <label className="w-20 h-20 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-white/40 transition">
            <Plus className="w-5 h-5 text-white/40" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, "galeria")} />
          </label>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label className="text-white/70">Colores disponibles</Label>
        <div className="flex flex-wrap items-center gap-2">
          {form.colores_disponibles.map((color, i) => (
            <button
              key={i}
              type="button"
              onClick={() => removeColor(i)}
              className="w-8 h-8 rounded-full border-2 border-white/30 hover:border-red-400 transition relative group"
              style={{ backgroundColor: color }}
            >
              <X className="w-3 h-3 text-white absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-8 h-8 rounded-full cursor-pointer bg-transparent"
            />
            <Button type="button" variant="outline" size="sm" onClick={addColor} className="bg-white/5 border-white/10 text-white/70 text-xs">
              Agregar
            </Button>
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <Switch
          checked={form.destacado}
          onCheckedChange={(v) => setForm((f) => ({ ...f, destacado: v }))}
        />
        <Label className="text-white/70">Producto destacado</Label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={saving}
          className="bg-[#7CB9E8] hover:bg-[#5DA8E0] text-white px-8"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {product ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} className="text-white/50 hover:text-white hover:bg-white/10">
          Cancelar
        </Button>
      </div>
    </form>
  );
}