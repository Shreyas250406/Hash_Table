import { Moon, Sun, Hash } from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface NavbarProps {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export function Navbar({ theme, setTheme }: NavbarProps) {
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Theory", href: "/theory" },
    { name: "Code", href: "/code" },
    { name: "Videos", href: "/videos" },
    { name: "Quiz", href: "/quiz" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-lg"
      style={{
        background:
          theme === "dark"
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.7)",
        borderBottom: theme === "dark"
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Hash
              className={`w-8 h-8 ${
                theme === "dark" ? "text-[#00FFB2]" : "text-[#0B79FF]"
              }`}
              strokeWidth={2.5}
            />
            <div
              className={`absolute inset-0 blur-lg ${
                theme === "dark" ? "bg-[#00FFB2]" : "bg-[#0B79FF]"
              } opacity-40`}
            />
          </div>
          <span
            className={`tracking-wide font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            style={{
              textShadow:
                theme === "dark"
                  ? "0 0 20px rgba(0, 255, 178, 0.5)"
                  : "0 0 12px rgba(11, 121, 255, 0.3)",
            }}
          >
            HashLearn
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative group font-medium transition-all duration-300 ${
                location.pathname === link.href
                  ? theme === "dark"
                    ? "text-white"
                    : "text-black"
                  : theme === "dark"
                  ? "text-[#A0A0A0] hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  theme === "dark" ? "bg-[#00FFB2]" : "bg-[#0B79FF]"
                } ${
                  location.pathname === link.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              theme === "dark"
                ? "bg-white/5 border-white/10 hover:bg-white/10"
                : "bg-black/5 border-black/10 hover:bg-black/10"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-[#4CC9F0]" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
