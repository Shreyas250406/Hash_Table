import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Hash Tables Explained - Data Structures',
    thumbnail: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=450&fit=crop',
    duration: '12:45',
    embedId: 'KyUTuwz_b7Q',
  },
  {
    id: 2,
    title: 'Collision Resolution Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop',
    duration: '15:30',
    embedId: 'MfhjkfocRR0',
  },
  {
    id: 3,
    title: 'Hash Functions in Python',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop',
    duration: '18:20',
    embedId: '9HFbhPscPU0',
  },
  {
    id: 4,
    title: 'Hash Tables in Java - Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop',
    duration: '22:15',
    embedId: 'shs0KM3wKv8',
  },
  {
    id: 5,
    title: 'C++ HashMap Implementation',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    duration: '16:40',
    embedId: 'Ke_tII6Y0GE',
  },
  {
    id: 6,
    title: 'Advanced Hashing Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop',
    duration: '20:10',
    embedId: 'FsfRsGFHuv4',
  },
];

export function VideoSection() {
  return (
    <section id="videos">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-white mb-4">Watch and Learn</h2>
        <p className="text-[#A0A0A0] max-w-2xl mx-auto">
          Comprehensive video tutorials to master hashing concepts from basics to advanced implementations.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div
                className="rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#4CC9F0]/50 hover:shadow-[0_0_30px_rgba(76,201,240,0.3)] hover:scale-105"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1A0B2E] to-[#0B1120]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#4CC9F0] flex items-center justify-center shadow-[0_0_30px_rgba(76,201,240,0.6)]">
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-white text-xs">
                    {video.duration}
                  </div>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-white text-sm group-hover:text-[#4CC9F0] transition-colors">
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
