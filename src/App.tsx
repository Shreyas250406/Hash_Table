import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HashTableVisualizer } from "./components/HashTableVisualizer";
import { TheorySection } from "./components/TheorySection";
import { CodePlayground } from "./components/CodePlayground";
import { VideoSection } from "./components/VideoSection";
import { QuizSection } from "./components/QuizSection";
import { Footer } from "./components/Footer"; // ✅ Add this import

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(
    (localStorage.getItem("theme") as "dark" | "light") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <main
        key={theme}
        className={`transition-all duration-700 min-h-screen ${
          theme === "dark" ? "bg-[#0E0E1A]" : "bg-[#F9FAFB]"
        }`}
      >
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/visualizer" element={<HashTableVisualizer />} />
          <Route path="/theory" element={<TheorySection />} />
          <Route path="/code" element={<CodePlayground />} />
          <Route path="/videos" element={<VideoSection />} />
          <Route path="/quiz" element={<QuizSection />} />
        </Routes>

        {/* ✅ Add the footer below all routes */}
        <Footer theme={theme} />
      </main>
    </Router>
  );
}

export default App;
