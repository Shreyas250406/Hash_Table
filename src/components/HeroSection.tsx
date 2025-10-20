import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#4CC9F0] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30"
          >
            <Sparkles className="w-4 h-4 text-[#00FFB2]" />
            <span className="text-[#00FFB2] text-sm">DSA Made Visual</span>
          </motion.div>

          <h1 className="text-white relative">
            Visualize Hashing Like Never Before{' '}
            <span className="inline-block">🚀</span>
          </h1>

          <p className="text-[#A0A0A0] text-lg max-w-lg">
            Learn Data Structures & Algorithms concepts with interactive animations, 
            real-world examples, and live code demonstrations. Master hashing the modern way.
          </p>
        </motion.div>

        {/* Right - Animated Hash Table Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            {/* Hash Table Visual */}
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative p-6 rounded-xl border border-white/10 bg-white/5"
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(76, 201, 240, 0.1)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#4CC9F0] text-sm">Index {index}</span>
                    <div className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
                  </div>
                  <div className="h-8 bg-gradient-to-r from-[#00FFB2]/20 to-[#4CC9F0]/20 rounded" />
                </motion.div>
              ))}
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB2]/10 to-[#4CC9F0]/10 blur-3xl -z-10" />
          </div>
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
            fill="url(#wave-gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A0B2E" />
              <stop offset="50%" stopColor="#4CC9F0" />
              <stop offset="100%" stopColor="#0B1120" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
