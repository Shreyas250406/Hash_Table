import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Hash Tables Explained - Data Structures",
    thumbnail:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=450&fit=crop",
    duration: "12:45",
    embedId: "KyUTuwz_b7Q",
  },
  {
    id: 2,
    title: "Collision Resolution Techniques",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop",
    duration: "15:30",
    embedId: "MfhjkfocRR0",
  },
  {
    id: 3,
    title: "Hash Functions in Python",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    duration: "18:20",
    embedId: "9HFbhPscPU0",
  },
  {
    id: 4,
    title: "Hash Tables in Java - Complete Guide",
    thumbnail:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop",
    duration: "22:15",
    embedId: "shs0KM3wKv8",
  },
  {
    id: 5,
    title: "C++ HashMap Implementation",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    duration: "16:40",
    embedId: "Ke_tII6Y0GE",
  },
  {
    id: 6,
    title: "Advanced Hashing Techniques",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop",
    duration: "20:10",
    embedId: "FsfRsGFHuv4",
  },
];

export function VideoSection() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) setTheme("dark");
    else setTheme("light");
  }, []);

  const colors = {
    bgSection: theme === "dark" ? "#0E0E1A" : "#F9FAFB",
    cardBg: theme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
    cardBorder:
      theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    textPrimary: theme === "dark" ? "#FFFFFF" : "#111827",
    textSecondary: theme === "dark" ? "#A0A0A0" : "#475569",
    hoverColor: theme === "dark" ? "#4CC9F0" : "#0B79FF",
    overlay: theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)",
  };

  return (
    <section
      id="videos"
      className="py-20 px-6 transition-all duration-700"
      style={{
        backgroundColor: colors.bgSection,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 transition-all duration-700"
      >
        <h2
          className="mb-4 transition-colors duration-700"
          style={{ color: colors.textPrimary }}
        >
          Watch and Learn
        </h2>
        <p
          className="max-w-2xl mx-auto transition-colors duration-700"
          style={{ color: colors.textSecondary }}
        >
          Comprehensive video tutorials to master hashing concepts from basics
          to advanced implementations.
        </p>
      </motion.div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div
              className="rounded-xl overflow-hidden border transition-all duration-500"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
                boxShadow:
                  theme === "dark"
                    ? "0 0 15px rgba(76,201,240,0.2)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Play Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: colors.overlay }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: colors.hoverColor,
                      boxShadow: `0 0 30px ${colors.hoverColor}60`,
                    }}
                  >
                    <Play
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Duration Badge */}
                <div
                  className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs transition-colors duration-700"
                  style={{
                    backgroundColor:
                      theme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
                    color: theme === "dark" ? "#FFFFFF" : "#111827",
                  }}
                >
                  {video.duration}
                </div>
              </div>

              {/* Title */}
              <div className="p-4">
                <h3
                  className="text-sm font-medium transition-colors duration-500"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {video.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
