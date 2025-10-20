import { Github, Linkedin, Youtube, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D18] border-t border-[#4CC9F0]/30 relative">
      {/* Glow line on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white mb-4">About HashLearn</h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              HashLearn is a modern educational platform dedicated to making Data Structures & Algorithms 
              concepts accessible through interactive visualizations, comprehensive theory, and practical code examples.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Visualizer', href: '#visualizer' },
                { name: 'Theory', href: '#theory' },
                { name: 'Code Examples', href: '#code' },
                { name: 'Video Tutorials', href: '#videos' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[#A0A0A0] hover:text-[#00FFB2] transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, color: '#E6E6E6', href: 'https://github.com/Shreyas250406/Hash_Table.git' },
                { icon: Linkedin, color: '#4CC9F0', href: '#' },
                { icon: Youtube, color: '#FF4D6D', href: '#' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-white/30 group"
                    style={{
                      '--hover-glow': `0 0 20px ${social.color}40`,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: social.color }} />
                  </a>
                );
              })}
            </div>
            <p className="text-[#A0A0A0] text-sm mt-4">
              Follow us for updates, tips, and more DSA content!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0A0A0]">
          <div className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-[#FF4D6D] fill-current" /> for DSA Learners
          </div>
          <div>© {currentYear} HashLearn. All rights reserved.</div>
        </div>
      </div>

      {/* Floating corner badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <div
          className="px-4 py-2 rounded-full border text-xs backdrop-blur-md"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            borderColor: 'rgba(0, 255, 178, 0.3)',
            color: '#00FFB2',
          }}
        >
          Built for DSA Learners | © HashLearn {currentYear}
        </div>
      </div>
    </footer>
  );
}
