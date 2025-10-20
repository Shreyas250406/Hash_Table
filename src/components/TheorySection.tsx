import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Hash, Calculator, GitMerge, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const theoryCards = [
  {
    id: "what-is-hashing",
    icon: Hash,
    title: "What is Hashing?",
    color: "#00FFB2",
    content: (
      <div className="space-y-3">
        <p>
          Hashing is a technique used to uniquely identify a specific object from a group of similar objects.
          It uses a hash function to map data of arbitrary size to fixed-size values called hash codes or hash values.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Hash tables provide O(1) average time complexity for insert, delete, and search operations</li>
          <li>Hash functions convert keys into array indices</li>
          <li>Common applications: databases, caches, password storage, cryptography</li>
          <li>Efficient data retrieval without searching through entire dataset</li>
        </ul>
      </div>
    ),
  },
  {
    id: "hash-functions",
    icon: Calculator,
    title: "Hash Functions",
    color: "#4CC9F0",
    content: (
      <div className="space-y-3">
        <p>
          A hash function takes an input (key) and returns a fixed-size string of bytes.
          Good hash functions minimize collisions and distribute keys uniformly.
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold">Division Method</h4>
            <code className="block p-3 rounded">
              hash(key) = key % table_size
            </code>
            <p className="mt-2 text-sm">Simple and fast. Works best when table_size is a prime number.</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Multiplication Method</h4>
            <code className="block p-3 rounded">
              hash(key) = floor(m * (key * A % 1))
            </code>
            <p className="mt-2 text-sm">Where A ≈ 0.618 (golden ratio). More uniform distribution.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "collision-handling",
    icon: GitMerge,
    title: "Collision Handling",
    color: "#FF4D6D",
    content: (
      <div className="space-y-3">
        <p>
          Collisions occur when two different keys hash to the same index.
          Several techniques exist to handle this:
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold">Chaining (Separate Chaining)</h4>
            <p className="text-sm">
              Each hash table cell points to a linked list of entries that hash to the same index.
              Simple to implement and handles high load factors well.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Open Addressing</h4>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Linear Probing: Check next slot sequentially</li>
              <li>Quadratic Probing: Check slots at quadratic intervals</li>
              <li>Double Hashing: Use second hash function to find next slot</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "load-factor",
    icon: TrendingUp,
    title: "Load Factor & Rehashing",
    color: "#FFD60A",
    content: (
      <div className="space-y-3">
        <p>
          Load factor (α) measures how full the hash table is and affects performance.
        </p>
        <div className="p-3 rounded mb-3">
          <code>Load Factor (α) = Number of entries / Table size</code>
        </div>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>α &lt; 0.7: Good performance with chaining</li>
          <li>α &gt; 0.75: Time to rehash (resize table and redistribute entries)</li>
          <li>Rehashing typically doubles the table size</li>
          <li>Lower load factor = fewer collisions but more memory</li>
        </ul>
        <div className="mt-4 p-4 rounded border">
          <p className="text-sm">
            💡 <strong>Pro Tip:</strong> Choose table size as a prime number to reduce clustering and improve distribution.
          </p>
        </div>
      </div>
    ),
  },
];

export function TheorySection() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) setTheme("dark");
    else setTheme("light");
  }, []);

  const colors = {
    bgSection: theme === "dark" ? "#0E0E1A" : "#F9FAFB",
    textPrimary: theme === "dark" ? "#FFFFFF" : "#111827",
    textSecondary: theme === "dark" ? "#A0A0A0" : "#475569",
    cardBg: theme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
    border: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    codeBg: theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(240,240,255,0.7)",
  };

  return (
    <section
      id="theory"
      className="py-20 px-6 relative transition-all duration-700"
      style={{ backgroundColor: colors.bgSection }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4 transition-colors duration-700"
            style={{ color: colors.textPrimary }}
          >
            Theory of Hashing
          </h2>
          <p
            className="max-w-2xl mx-auto transition-colors duration-700"
            style={{ color: colors.textSecondary }}
          >
            Deep dive into the fundamental concepts that power hash tables and make them one of the most important data structures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {theoryCards.map((card) => {
              const Icon = card.icon;
              return (
                <AccordionItem
                  key={card.id}
                  value={card.id}
                  className="border rounded-xl overflow-hidden transition-all duration-700"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.cardBg,
                    backdropFilter: "blur(15px)",
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-4 hover:no-underline transition-colors"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: `${card.color}15`,
                          borderColor: `${card.color}40`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: card.color }}
                        />
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        {card.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 transition-all duration-700">
                    <div
                      className="text-sm space-y-3"
                      style={{ color: colors.textSecondary }}
                    >
                      {card.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
