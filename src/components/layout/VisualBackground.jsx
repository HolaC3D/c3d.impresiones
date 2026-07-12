import React from "react";

export default function VisualBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #fce8f0 40%, #fef0e6 70%, #edf7e6 100%)" }}>
      {/* Vibrant pastel blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full blur-[120px] opacity-70" style={{ background: "#A8D8EA" }} />
      <div className="absolute bottom-[5%] right-[-8%] w-[50%] h-[50%] rounded-full blur-[110px] opacity-65" style={{ background: "#F7B8D0" }} />
      <div className="absolute top-[35%] left-[10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-55" style={{ background: "#FFD3B6" }} />
      <div className="absolute top-[60%] right-[15%] w-[35%] h-[35%] rounded-full blur-[90px] opacity-50" style={{ background: "#DCEDC1" }} />
      <div className="absolute top-[10%] right-[20%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-55" style={{ background: "#D4AAFF" }} />
      <div className="absolute bottom-[30%] left-[30%] w-[25%] h-[25%] rounded-full blur-[80px] opacity-45" style={{ background: "#FFEAA7" }} />
      
      {/* Geometric dot pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.2" fill="#3D405B" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Floating geometric shapes */}
      <svg className="absolute top-[20%] left-[5%] w-16 h-16 opacity-[0.06] animate-pulse" viewBox="0 0 64 64">
        <polygon points="32,4 60,60 4,60" fill="none" stroke="#3D405B" strokeWidth="1" />
      </svg>
      <svg className="absolute top-[70%] right-[10%] w-12 h-12 opacity-[0.05]" viewBox="0 0 48 48">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="#3D405B" strokeWidth="1" transform="rotate(45 24 24)" />
      </svg>
      <svg className="absolute top-[45%] right-[40%] w-8 h-8 opacity-[0.04]" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill="none" stroke="#3D405B" strokeWidth="1" />
      </svg>
    </div>
  );
}