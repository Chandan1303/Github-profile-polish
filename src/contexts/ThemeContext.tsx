import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeColor = "emerald" | "blue" | "purple" | "orange" | "pink" | "cyan";

interface ThemeContextType {
  bgColor: ThemeColor;
  setBgColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bgColor, setBgColor] = useState<ThemeColor>("emerald");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme-bg-color") as ThemeColor | null;
    if (saved) {
      setBgColor(saved);
      applyTheme(saved);
    } else {
      applyTheme("emerald");
    }
  }, []);

  const applyTheme = (color: ThemeColor) => {
    const root = document.documentElement;
    const themes = {
      emerald: {
        primary: "142 70% 45%",
        primaryFg: "220 20% 4%",
        accent: "142 50% 30%",
        chart1: "142 70% 45%",
      },
      blue: {
        primary: "200 70% 50%",
        primaryFg: "220 20% 4%",
        accent: "200 50% 35%",
        chart1: "200 70% 50%",
      },
      purple: {
        primary: "280 60% 55%",
        primaryFg: "220 20% 4%",
        accent: "280 40% 40%",
        chart1: "280 60% 55%",
      },
      orange: {
        primary: "40 80% 55%",
        primaryFg: "220 20% 4%",
        accent: "40 60% 40%",
        chart1: "40 80% 55%",
      },
      pink: {
        primary: "340 70% 55%",
        primaryFg: "220 20% 4%",
        accent: "340 50% 40%",
        chart1: "340 70% 55%",
      },
      cyan: {
        primary: "180 70% 50%",
        primaryFg: "220 20% 4%",
        accent: "180 50% 35%",
        chart1: "180 70% 50%",
      },
    };

    const theme = themes[color];
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-foreground", theme.primaryFg);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--chart-1", theme.chart1);
    root.style.setProperty("--ring", theme.primary);
    root.style.setProperty("--sidebar-primary", theme.primary);
    root.style.setProperty("--sidebar-ring", theme.primary);
  };

  const handleColorChange = (color: ThemeColor) => {
    setBgColor(color);
    localStorage.setItem("theme-bg-color", color);
    applyTheme(color);
  };

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor: handleColorChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
