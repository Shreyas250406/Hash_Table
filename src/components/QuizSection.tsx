import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the average time complexity for search operation in a hash table?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation:
      "Hash tables provide O(1) average time complexity for search operations due to direct indexing via hash function.",
  },
  {
    id: 2,
    question: "Which collision resolution technique uses linked lists?",
    options: ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"],
    correctAnswer: 2,
    explanation:
      "Chaining (Separate Chaining) uses linked lists to store multiple entries that hash to the same index.",
  },
  {
    id: 3,
    question: "What happens when the load factor exceeds the threshold?",
    options: ["Delete random entries", "Rehashing occurs", "Table becomes read-only", "Performance improves"],
    correctAnswer: 1,
    explanation:
      "When load factor exceeds the threshold (typically 0.75), rehashing occurs where the table size is increased and all entries are redistributed.",
  },
  {
    id: 4,
    question: "Which is NOT a good property of a hash function?",
    options: ["Deterministic", "Uniform distribution", "Always returns same value", "Fast computation"],
    correctAnswer: 2,
    explanation:
      "A good hash function should distribute keys uniformly. Always returning the same value would cause all keys to hash to the same index, defeating the purpose.",
  },
  {
    id: 5,
    question: "In the division method, what type of number is best for table size?",
    options: ["Even number", "Power of 2", "Prime number", "Odd number"],
    correctAnswer: 2,
    explanation:
      "Prime numbers are best for table size in the division method as they help reduce clustering and provide better distribution of hash values.",
  },
];

export function QuizSection() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) setTheme("dark");
    else setTheme("light");
  }, []);

  const colors = {
    bgSection: theme === "dark" ? "#0E0E1A" : "#F9FAFB",
    bgCard: theme === "dark" ? "rgba(255,255,255,0.05)" : "#FFFFFF",
    borderCard: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    textPrimary: theme === "dark" ? "#FFFFFF" : "#111827",
    textSecondary: theme === "dark" ? "#A0A0A0" : "#475569",
    correct: "#00FFB2",
    incorrect: "#FF4D6D",
    neutral: theme === "dark" ? "rgba(255,255,255,0.03)" : "#F3F4F6",
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  const question = questions[currentQuestion];
  const percentage = (score / questions.length) * 100;

  if (quizComplete) {
    return (
      <section
        id="quiz"
        className="py-20 px-6 transition-all duration-700"
        style={{ backgroundColor: colors.bgSection }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl border text-center relative overflow-hidden transition-all duration-700"
            style={{
              borderColor: colors.borderCard,
              backgroundColor: colors.bgCard,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Confetti Effect */}
            {percentage === 100 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ["#00FFB2", "#4CC9F0", "#FF4D6D", "#FFD60A"][i % 4],
                      left: `${Math.random() * 100}%`,
                      top: "-10%",
                    }}
                    animate={{
                      y: ["0vh", "110vh"],
                      rotate: [0, 360],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00FFB2] to-[#4CC9F0] flex items-center justify-center shadow-[0_0_40px_rgba(0,255,178,0.5)]">
                <Trophy className="w-10 h-10 text-black" />
              </div>

              <h2 className="mb-4" style={{ color: colors.textPrimary }}>
                Quiz Complete! 🎉
              </h2>
              <p className="mb-8" style={{ color: colors.textSecondary }}>
                {percentage === 100
                  ? "Perfect score! You're a hashing expert! 🌟"
                  : percentage >= 80
                  ? "Great job! You have a solid understanding of hashing!"
                  : percentage >= 60
                  ? "Good effort! Review the theory section to improve."
                  : "Keep learning! Practice makes perfect."}
              </p>

              <div className="mb-8">
                <div className="text-6xl mb-2">
                  <span style={{ color: colors.textPrimary }}>{score}</span>
                  <span style={{ color: colors.textSecondary }}>
                    /{questions.length}
                  </span>
                </div>
                <p className="text-[#4CC9F0]">{percentage.toFixed(0)}% Correct</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto mb-8 h-3 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#00FFB2] to-[#4CC9F0]"
                />
              </div>

              <Button
                onClick={resetQuiz}
                className="bg-[#00FFB2] hover:bg-[#00FFB2]/90 text-black"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="quiz"
      className="py-20 px-6 transition-all duration-700"
      style={{ backgroundColor: colors.bgSection }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4" style={{ color: colors.textPrimary }}>
            Test Your Knowledge
          </h2>
          <p style={{ color: colors.textSecondary }}>
            Challenge yourself with these questions about hashing and hash tables.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl border transition-all duration-700"
          style={{
            borderColor: colors.borderCard,
            backgroundColor: colors.bgCard,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      index === currentQuestion
                        ? colors.correct
                        : answeredQuestions.includes(index)
                        ? "#4CC9F0"
                        : colors.borderCard,
                  }}
                />
              ))}
            </div>
            <span style={{ color: colors.textSecondary, fontSize: "0.85rem" }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3
                className="mb-6 font-medium"
                style={{ color: colors.textPrimary }}
              >
                {question.question}
              </h3>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className="w-full p-4 rounded-lg border flex items-center justify-between transition-all duration-300 text-left"
                      style={{
                        borderColor: showCorrect
                          ? colors.correct
                          : showIncorrect
                          ? colors.incorrect
                          : isSelected
                          ? "#4CC9F0"
                          : colors.borderCard,
                        backgroundColor: showCorrect
                          ? "rgba(0,255,178,0.1)"
                          : showIncorrect
                          ? "rgba(255,77,109,0.1)"
                          : isSelected
                          ? "rgba(76,201,240,0.1)"
                          : colors.neutral,
                      }}
                    >
                      <span
                        style={{
                          color:
                            showCorrect || showIncorrect
                              ? colors.textPrimary
                              : colors.textSecondary,
                        }}
                      >
                        {option}
                      </span>
                      {showCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#00FFB2]" />
                      )}
                      {showIncorrect && (
                        <XCircle className="w-5 h-5 text-[#FF4D6D]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-lg border"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(76,201,240,0.1)"
                          : "rgba(11,121,255,0.1)",
                      borderColor: "#4CC9F0",
                    }}
                  >
                    <p
                      style={{ color: colors.textPrimary, fontSize: "0.9rem" }}
                    >
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {showResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-[#00FFB2] hover:bg-[#00FFB2]/90 text-black"
                  >
                    {currentQuestion < questions.length - 1
                      ? "Next Question"
                      : "View Results"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
