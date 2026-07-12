import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import logoC3D from "../../../imagen/logoc3dimpresiones.png";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError("Credenciales incorrectas");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14152a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src={logoC3D}
            alt="c.3.d. impresiones"
            className="h-20 w-auto rounded-lg mx-auto mb-2"
          />
          <h1 className="font-heading font-bold text-xl text-white">Panel de Administración</h1>
          <p className="text-white/40 text-sm mt-1">Ingresá tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/70">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="admin@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/70">Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7CB9E8] hover:bg-[#5DA8E0] text-white py-3"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}