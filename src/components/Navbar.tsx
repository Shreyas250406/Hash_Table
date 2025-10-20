import { useState } from 'react';
import { Moon, Sun, Hash } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Visualizer', href: '/visualizer' },
    { name: 'Theory', href: '/theory' },
    { name: 'Code', href: '/code' },
    { name: 'Videos', href: '/videos' },
    { name: 'Quiz', href: '/quiz' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Hash className="w-8 h-8 text-[#00FFB2]" strokeWidth={2.5} />
            <div className="absolute inset-0 blur-lg bg-[#00FFB2] opacity-50" />
          </div>
          <span
            className="text-white tracking-wide"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 178, 0.5)',
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
              className={`relative group transition-all duration-300 ${
                location.pathname === link.href
                  ? 'text-white'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#00FFB2] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,178,0.5)] ${
                  location.pathname === link.href
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:shadow-[0_0_20px_rgba(76,201,240,0.3)]"
          >
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-[#4CC9F0]" />
            ) : (
              <Sun className="w-5 h-5 text-[#FFD60A]" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
