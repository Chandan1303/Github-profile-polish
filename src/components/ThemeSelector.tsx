import { Palette } from "lucide-react";
import { useTheme, type ThemeColor } from "@/contexts/ThemeContext";
import { useState } from "react";

const THEME_OPTIONS: { color: ThemeColor; label: string; hex: string }[] = [
  { color: "emerald", label: "Emerald", hex: "#10b981" },
  { color: "blue", label: "Blue", hex: "#3b82f6" },
  { color: "purple", label: "Purple", hex: "#a855f7" },
  { color: "orange", label: "Orange", hex: "#f97316" },
  { color: "pink", label: "Pink", hex: "#ec4899" },
  { color: "cyan", label: "Cyan", hex: "#06b6d4" },
];

export const ThemeSelector = () => {
  const { bgColor, setBgColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 glass rounded-xl p-3 shadow-lg border border-border space-y-2 w-48">
          <p className="text-xs text-muted-foreground font-semibold px-2 py-1">
            Choose Theme Color
          </p>
          {THEME_OPTIONS.map(({ color, label, hex }) => (
            <button
              key={color}
              onClick={() => {
                setBgColor(color);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                bgColor === color
                  ? "bg-primary/20 border border-primary"
                  : "hover:bg-secondary/50 border border-transparent"
              }`}
            >
              <div
                className="w-5 h-5 rounded-full border-2 border-foreground/30"
                style={{ backgroundColor: hex }}
              />
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110 glow-green font-semibold"
      >
        <Palette className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">Theme</span>
      </button>
    </div>
  );
};
