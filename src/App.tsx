import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HashTableVisualizer } from './components/HashTableVisualizer';
import { TheorySection } from './components/TheorySection';
import { CodePlayground } from './components/CodePlayground';
import { VideoSection } from './components/VideoSection';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

// ✅ This sub-component uses useLocation safely inside Router
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageVariants}>
              <HeroSection />
            </motion.div>
          }
        />
        <Route
          path="/visualizer"
          element={
            <motion.div {...pageVariants}>
              <HashTableVisualizer />
            </motion.div>
          }
        />
        <Route
          path="/theory"
          element={
            <motion.div {...pageVariants}>
              <TheorySection />
            </motion.div>
          }
        />
        <Route
          path="/code"
          element={
            <motion.div {...pageVariants}>
              <CodePlayground />
            </motion.div>
          }
        />
        <Route
          path="/videos"
          element={
            <motion.div {...pageVariants}>
              <VideoSection />
            </motion.div>
          }
        />
        <Route
          path="/quiz"
          element={
            <motion.div {...pageVariants}>
              <QuizSection />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden">
        {/* Background Gradient */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, #0E0E1A 0%, #1A0B2E 40%, #0B1120 100%)',
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Main animated content */}
        <main className="pt-20">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
