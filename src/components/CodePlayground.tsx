import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

type Language = "cpp" | "java" | "python";

const codeSnippets = {
  insert: {
    cpp: `int hashFunction(int key, int size) {
    return key % size;
}

void insert(vector<vector<pair<int,int>>> &table, int key, int value, int size) {
    int index = hashFunction(key, size);
    for (auto &p : table[index]) {
        if (p.first == key) { 
            p.second = value; // Update value
            return;
        }
    }
    table[index].push_back({key, value}); // Insert new pair
}`,
    java: `int hashFunction(int key, int size) {
    return key % size;
}

void insert(List<List<int[]>> table, int key, int value, int size) {
    int index = hashFunction(key, size);
    for (int[] pair : table.get(index)) {
        if (pair[0] == key) {
            pair[1] = value; // Update
            return;
        }
    }
    table.get(index).add(new int[]{key, value});
}`,
    python: `def hash_function(key, size):
    return key % size

def insert(table, key, value, size):
    index = hash_function(key, size)
    for i, (k, v) in enumerate(table[index]):
        if k == key:
            table[index][i] = (key, value)  # Update
            return
    table[index].append((key, value))  # Insert new`,
  },

  search: {
    cpp: `int search(vector<vector<pair<int,int>>> &table, int key, int size) {
    int index = key % size;
    for (auto &p : table[index]) {
        if (p.first == key)
            return p.second;
    }
    return -1; // Not found
}`,
    java: `int search(List<List<int[]>> table, int key, int size) {
    int index = key % size;
    for (int[] pair : table.get(index)) {
        if (pair[0] == key)
            return pair[1];
    }
    return -1; // Not found
}`,
    python: `def search(table, key, size):
    index = key % size
    for k, v in table[index]:
        if k == key:
            return v
    return None  # Not found`,
  },

  delete: {
    cpp: `void deleteKey(vector<vector<pair<int,int>>> &table, int key, int size) {
    int index = key % size;
    auto &bucket = table[index];
    for (auto it = bucket.begin(); it != bucket.end(); ++it) {
        if (it->first == key) {
            bucket.erase(it);
            return;
        }
    }
}`,
    java: `void deleteKey(List<List<int[]>> table, int key, int size) {
    int index = key % size;
    table.get(index).removeIf(pair -> pair[0] == key);
}`,
    python: `def delete_key(table, key, size):
    index = key % size
    for i, (k, _) in enumerate(table[index]):
        if k == key:
            del table[index][i]
            return True
    return False`,
  },
};

const languageLabels = {
  cpp: "C++",
  java: "Java",
  python: "Python",
};

const CodeBlock = ({
  code,
  onCopy,
  copied,
}: {
  code: string;
  onCopy: () => void;
  copied: boolean;
}) => (
  <div className="relative group">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FFB2] to-[#4CC9F0] rounded-l" />
    <div className="p-6 pl-8 rounded-xl bg-[#0D0D18] border border-white/10 overflow-x-auto relative">
      <Button
        size="sm"
        variant="ghost"
        onClick={onCopy}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-[#00FFB2]" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <pre className="text-sm text-[#E6E6E6] font-mono leading-relaxed whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export function CodePlayground() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedLangs, setSelectedLangs] = useState<{
    [key: string]: Language;
  }>({
    insert: "cpp",
    search: "cpp",
    delete: "cpp",
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleLangChange = (operation: string, lang: Language) => {
    setSelectedLangs((prev) => ({ ...prev, [operation]: lang }));
  };

  const operations = ["insert", "search", "delete"] as const;
  const colors = {
    insert: "#00FFB2",
    search: "#FFD60A",
    delete: "#FF4D6D",
  };

  return (
    <section id="code" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white mb-4">Hash Table Function Implementations</h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto">
            Learn how to perform insertion, search, and deletion in hash tables using
            simple functions — available in C++, Java, and Python.
          </p>
        </motion.div>

        {operations.map((op) => (
          <motion.div
            key={op}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h3 className="text-white mb-4 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: colors[op] }}
              />
              {op.charAt(0).toUpperCase() + op.slice(1)} Operation
            </h3>

            {/* Language Tabs */}
            <div className="flex gap-4 mb-4">
              {(["cpp", "java", "python"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(op, lang)}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedLangs[op] === lang
                      ? "bg-[#00FFB2] text-black shadow-[0_0_15px_rgba(0,255,178,0.3)]"
                      : "bg-white/5 text-[#A0A0A0] border border-white/10 hover:border-[#00FFB2]/40 hover:text-white"
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <CodeBlock
              code={codeSnippets[op][selectedLangs[op]]}
              onCopy={() =>
                copyToClipboard(codeSnippets[op][selectedLangs[op]], op)
              }
              copied={copied === op}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
