import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, LayoutGrid, BarChart3, LogOut } from "lucide-react";
import logoC3D from "../../../imagen/logoc3dimpresiones.png";

const links = [
  { label: "Productos", path: "/admin", icon: Package },
  { label: "Categorías", path: "/admin/categorias", icon: LayoutGrid },
  { label: "Estadísticas", path: "/admin/stats", icon: BarChart3 },
];

export default function AdminSidebar({ onLogout }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e1f2e] min-h-screen flex flex-col p-4 hidden md:flex">
      <div className="flex items-center gap-2 px-3 py-4 mb-6">
        <img
          src={logoC3D}
          alt="c.3.d. impresiones"
          className="h-10 w-auto rounded-lg"
        />
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition mt-4"
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesión
      </button>
    </aside>
  );
}