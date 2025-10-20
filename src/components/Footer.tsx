import { Github, Linkedin, Youtube, Heart } from "lucide-react";

interface FooterProps {
  theme: "dark" | "light";
}

export function Footer({ theme }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isDark = theme === "dark";

  return (
    <footer
      className={`relative border-t transition-all duration-700 ${
        isDark
          ? "bg-[#0D0D18] border-[#4CC9F0]/30 text-[#A0A0A0]"
          : "bg-[#F9FAFB] border-gray-200 text-gray-600"
      }`}
    >
      {/* Glow line on top */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
          isDark
            ? "from-transparent via-[#4CC9F0] to-transparent opacity-50"
            : "from-transparent via-[#0B79FF] to-transparent opacity-60"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className={isDark ? "text-white mb-4" : "text-black mb-4"}>
              About HashLearn
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-[#A0A0A0]" : "text-gray-700"
              }`}
            >
              HashLearn is a modern educational platform dedicated to making
              Data Structures & Algorithms concepts accessible through
              interactive visualizations, comprehensive theory, and practical
              code examples.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={isDark ? "text-white mb-4" : "text-black mb-4"}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "Visualizer", href: "#visualizer" },
                { name: "Theory", href: "#theory" },
                { name: "Code Examples", href: "#code" },
                { name: "Video Tutorials", href: "#videos" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-[#A0A0A0] hover:text-[#00FFB2]"
                        : "text-gray-600 hover:text-[#0B79FF]"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className={isDark ? "text-white mb-4" : "text-black mb-4"}>
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {[
                {
                  icon: Github,
                  color: isDark ? "#E6E6E6" : "#0B1220",
                  href: "https://github.com/Shreyas250406/Hash_Table.git",
                },
                {
                  icon: Linkedin,
                  color: isDark ? "#4CC9F0" : "#0B79FF",
                  href: "#",
                },
                {
                  icon: Youtube,
                  color: "#FF4D6D",
                  href: "#",
                },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 group ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:border-white/30"
                        : "bg-white border-gray-300 hover:border-[#0B79FF]/50 shadow-sm"
                    }`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: social.color }} />
                  </a>
                );
              })}
            </div>
            <p
              className={`text-sm mt-4 ${
                isDark ? "text-[#A0A0A0]" : "text-gray-700"
              }`}
            >
              Follow us for updates, tips, and more DSA content!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px mb-6 bg-gradient-to-r ${
            isDark
              ? "from-transparent via-white/10 to-transparent"
              : "from-transparent via-gray-300 to-transparent"
          }`}
        />

        {/* Bottom */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
            isDark ? "text-[#A0A0A0]" : "text-gray-600"
          }`}
        >
          <div className="flex items-center gap-2">
            Made with{" "}
            <Heart
              className={`w-4 h-4 ${
                isDark ? "text-[#FF4D6D]" : "text-[#FF4D6D]"
              } fill-current`}
            />{" "}
            for DSA Learners
          </div>
          <div>© {currentYear} HashLearn. All rights reserved.</div>
        </div>
      </div>

      {/* Floating corner badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <div
          className={`px-4 py-2 rounded-full border text-xs backdrop-blur-md transition-all ${
            isDark
              ? "border-[#00FFB2]/30 text-[#00FFB2]"
              : "border-[#0B79FF]/40 text-[#0B79FF]"
          }`}
          style={{
            background: isDark
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.8)",
          }}
        >
          Built for DSA Learners | © HashLearn {currentYear}
        </div>
      </div>
    </footer>
  );
}
