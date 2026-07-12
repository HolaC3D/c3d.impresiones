import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminStats from "@/pages/admin/AdminStats";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await base44.auth.isAuthenticated();
      setIsAuth(authenticated);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    base44.auth.logout("/admin");
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#14152a] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#14152a] flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 p-6 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <Routes>
          <Route index element={<AdminProducts />} />
          <Route path="categorias" element={<AdminCategories />} />
          <Route path="stats" element={<AdminStats />} />
        </Routes>
      </div>
      <AdminMobileNav onLogout={handleLogout} />
    </div>
  );
}