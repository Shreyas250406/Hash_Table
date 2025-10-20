import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HashEntry {
  key: string;
  value: string;
}

export function HashTableVisualizer() {
  const [hashTable, setHashTable] = useState<(HashEntry | null)[]>(Array(10).fill(null));
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [hashFunction, setHashFunction] = useState('division');
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'insert' | 'delete' | 'search' | null>(null);

  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const getHashIndex = (key: string): number => {
    const code = hashCode(key);
    if (hashFunction === 'division') {
      return code % hashTable.length;
    } else if (hashFunction === 'multiplication') {
      const A = 0.6180339887; // Golden ratio
      return Math.floor(hashTable.length * ((code * A) % 1));
    }
    return code % hashTable.length;
  };

  const handleInsert = () => {
    if (!key || !value) return;
    
    const index = getHashIndex(key);
    setAnimatingIndex(index);
    setAnimationType('insert');

    setTimeout(() => {
      const newTable = [...hashTable];
      newTable[index] = { key, value };
      setHashTable(newTable);
      setKey('');
      setValue('');
      setTimeout(() => {
        setAnimatingIndex(null);
        setAnimationType(null);
      }, 500);
    }, 800);
  };

  const handleDelete = () => {
    if (!key) return;

    const index = getHashIndex(key);
    setAnimatingIndex(index);
    setAnimationType('delete');

    setTimeout(() => {
      const newTable = [...hashTable];
      newTable[index] = null;
      setHashTable(newTable);
      setKey('');
      setTimeout(() => {
        setAnimatingIndex(null);
        setAnimationType(null);
      }, 500);
    }, 800);
  };

  const handleSearch = () => {
    if (!key) return;

    const index = getHashIndex(key);
    setAnimatingIndex(index);
    setAnimationType('search');

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimationType(null);
    }, 1500);
  };

  const handleClear = () => {
    setHashTable(Array(10).fill(null));
    setKey('');
    setValue('');
  };

  const getGlowColor = () => {
    if (animationType === 'insert') return 'rgba(0, 255, 178, 0.6)';
    if (animationType === 'delete') return 'rgba(255, 77, 109, 0.6)';
    if (animationType === 'search') return 'rgba(255, 214, 10, 0.6)';
    return 'rgba(76, 201, 240, 0.3)';
  };

  return (
    <section id="visualizer" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white mb-4">Interactive Hash Table Visualizer</h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto">
            See hashing in action. Insert, delete, and search for keys to understand how hash tables work.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Hash Table Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5" style={{ backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white">Hash Table (Size: {hashTable.length})</h3>
                <Select value={hashFunction} onValueChange={setHashFunction}>
                  <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="division">Division Method</SelectItem>
                    <SelectItem value="multiplication">Multiplication Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {hashTable.map((entry, index) => (
                  <motion.div
                    key={index}
                    className="relative p-4 rounded-lg border transition-all duration-300"
                    style={{
                      borderColor: animatingIndex === index ? getGlowColor() : 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: entry ? 'rgba(76, 201, 240, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      boxShadow: animatingIndex === index ? `0 0 20px ${getGlowColor()}` : 'none',
                    }}
                    animate={animatingIndex === index ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#4CC9F0] text-sm">Index {index}</span>
                      {entry && (
                        <div className="w-2 h-2 rounded-full bg-[#00FFB2]" />
                      )}
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {entry ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-1"
                        >
                          <div className="text-white text-sm truncate">Key: {entry.key}</div>
                          <div className="text-[#A0A0A0] text-xs truncate">Value: {entry.value}</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[#A0A0A0] text-sm"
                        >
                          Empty
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5" style={{ backdropFilter: 'blur(20px)' }}>
              <h3 className="text-white mb-4">Controls</h3>
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Enter key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#A0A0A0]"
                  />
                  <Input
                    placeholder="Enter value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#A0A0A0]"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={handleInsert}
                    className="bg-[#00FFB2] hover:bg-[#00FFB2]/90 text-black"
                    disabled={!key || !value}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Insert
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D]/10"
                    disabled={!key}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    onClick={handleSearch}
                    variant="outline"
                    className="border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A]/10"
                    disabled={!key}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
