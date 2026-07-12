import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

export default function WhatsAppCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, #A8D8EA 0%, #F7D6E0 50%, #FFD3B6 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <div className="relative z-10 space-y-5">
            <h2 className="font-heading font-black text-3xl md:text-4xl text-ink">
              ¿Tenés una idea en mente?
            </h2>
            <p className="text-ink/70 text-lg max-w-md mx-auto">
              Convertimos tu imaginación en realidad. Escribinos y creamos juntos algo increíble.
            </p>
            <a
              href="https://wa.me/5491136176535?text=Hola! Tengo una idea para un producto personalizado 🎨"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#3D405B] hover:bg-[#2d2f43] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Contame tu idea por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}