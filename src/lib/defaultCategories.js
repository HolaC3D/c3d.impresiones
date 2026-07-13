export const DEFAULT_CATEGORIES = [
  "Cuadernos personalizados",
  "Llaveros Cutie",
  "Decoración",
  "Accesorios",
  "Impresiones personalizadas",
];

export const DEFAULT_CATEGORY_STYLES = {
  "Cuadernos personalizados": { icon: "BookOpen", color: "#F7D6E0" },
  "Llaveros Cutie": { icon: "KeyRound", color: "#A8D8EA" },
  "Decoración": { icon: "Home", color: "#DCEDC1" },
  "Accesorios": { icon: "Puzzle", color: "#FFD3B6" },
  "Impresiones personalizadas": { icon: "Sparkles", color: "#7CB9E8" },
};

export function uniqueCategories(names = []) {
  return Array.from(new Set((names || []).filter(Boolean).map((n) => n.trim()).filter(Boolean)));
}
