import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, LayoutGrid, BarChart3, LogOut } from "lucide-react";

const links = [
  { label: "Productos", path: "/admin", icon: Package },
  { label: "Categorías", path: "/admin/categorias", icon: LayoutGrid },
  { label: "Stats", path: "/admin/stats", icon: BarChart3 },
];

export default function AdminMobileNav({ onLogout }) {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1f2e] border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs transition ${
                isActive ? "text-white" : "text-white/40"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs text-white/40 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          Salir
        </button>
      </div>
    </div>
  );
}