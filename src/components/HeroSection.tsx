import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) setTheme("dark");
    else setTheme("light");
  }, []);

  // Accent colors based on theme
  const accent =
    theme === "dark" ? "#00FFB2" : "#0B79FF";
  const secondary =
    theme === "dark" ? "#4CC9F0" : "#8B5CF6";
  const textColor =
    theme === "dark" ? "#FFFFFF" : "#1A1A1A";
  const subTextColor =
    theme === "dark" ? "#A0A0A0" : "#374151";
  const cardBg =
    theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)";
  const borderColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-all duration-700"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: accent,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              backgroundColor:
                theme === "dark"
                  ? `${accent}10`
                  : "rgba(11,121,255,0.08)",
              borderColor:
                theme === "dark"
                  ? `${accent}30`
                  : "rgba(11,121,255,0.2)",
            }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: accent }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: accent }}
            >
              DSA Made Visual
            </span>
          </motion.div>

          <h1
            className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold"
            style={{
              color: textColor,
              lineHeight: "1.2",
            }}
          >
            Visualize Hashing Like Never Before 🚀
          </h1>

          <p
            className="text-lg max-w-lg leading-relaxed"
            style={{ color: subTextColor }}
          >
            Learn Data Structures & Algorithms concepts with
            interactive animations, real-world examples, and
            live code demonstrations. Master hashing the modern way.
          </p>
        </motion.div>

        {/* Right - Animated Hash Table Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative grid grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative p-6 rounded-xl transition-all duration-700"
                style={{
                  border: `1px solid ${borderColor}`,
                  backgroundColor: cardBg,
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    theme === "dark"
                      ? "0 0 20px rgba(76, 201, 240, 0.1)"
                      : "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-sm font-medium"
                    style={{ color: secondary }}
                  >
                    Index {index}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: accent }}
                  />
                </div>
                <div
                  className="h-8 rounded transition-all duration-700"
                  style={{
                    background: `linear-gradient(to right, ${accent}30, ${secondary}30)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Subtle Glow */}
          <div
            className="absolute inset-0 blur-3xl -z-10 transition-all duration-700"
            style={{
              background: `linear-gradient(to right, ${accent}10, ${secondary}10)`,
            }}
          />
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill={`url(#wave-gradient-${theme})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient
              id={`wave-gradient-${theme}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {theme === "dark" ? (
                <>
                  <stop offset="0%" stopColor="#1A0B2E" />
                  <stop offset="50%" stopColor="#4CC9F0" />
                  <stop offset="100%" stopColor="#0B1120" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#E6F0FF" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#D6E2FF" />
                </>
              )}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
