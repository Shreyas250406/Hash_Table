import { motion } from 'motion/react';
import { CheckCircle2, Circle, Play } from 'lucide-react';
import { Button } from './ui/button';

const milestones = [
  { id: 1, label: 'Watched Videos', completed: true, icon: '🎥' },
  { id: 2, label: 'Read Theory', completed: true, icon: '📚' },
  { id: 3, label: 'Tried Visualizer', completed: true, icon: '🎨' },
  { id: 4, label: 'Completed Quiz', completed: false, icon: '🧠' },
];

export function ProgressTracker() {
  const completedCount = milestones.filter((m) => m.completed).length;
  const progress = (completedCount / milestones.length) * 100;

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white mb-4">Your Learning Progress</h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto">
            Track your journey through the HashLearn platform. Complete all milestones to master hashing!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          {/* Background Hash Table Element */}
          <div className="absolute right-0 top-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="10" y="10" width="80" height="15" fill="#00FFB2" />
              <rect x="10" y="30" width="80" height="15" fill="#4CC9F0" />
              <rect x="10" y="50" width="80" height="15" fill="#00FFB2" />
              <rect x="10" y="70" width="80" height="15" fill="#4CC9F0" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white">Overall Progress</span>
                <span className="text-[#00FFB2]">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#00FFB2] to-[#4CC9F0] relative"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 178, 0.5)',
                  }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse" />
                </motion.div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: milestone.completed
                      ? 'rgba(0, 255, 178, 0.3)'
                      : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: milestone.completed
                      ? 'rgba(0, 255, 178, 0.05)'
                      : 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{milestone.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {milestone.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#A0A0A0]" />
                        )}
                        <span
                          className="text-sm"
                          style={{
                            color: milestone.completed ? '#00FFB2' : '#A0A0A0',
                          }}
                        >
                          {milestone.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00FFB2] to-[#4CC9F0] hover:from-[#00FFB2]/90 hover:to-[#4CC9F0]/90 text-black shadow-[0_0_30px_rgba(0,255,178,0.3)]"
                onClick={() => {
                  const nextIncomplete = milestones.find((m) => !m.completed);
                  if (nextIncomplete) {
                    document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                {progress === 100 ? 'Review Content' : 'Continue Learning'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
