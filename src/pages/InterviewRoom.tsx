import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = ["HTML", "CSS", "JavaScript", "TypeScript", "React (JSX)"];

const AI_QUESTIONS = [
  {
    id: 1,
    type: "coding",
    title: "Flatten a nested object",
    description:
      "Write a JavaScript function that takes a deeply nested object and returns a flat object with dot-notation keys.\n\nExample:\nInput:  { a: { b: { c: 1 } } }\nOutput: { 'a.b.c': 1 }",
  },
  {
    id: 2,
    type: "mcq",
    title: "React rendering",
    description:
      "Which hook should you use to run a side effect only once after the component mounts?",
    options: ["useState", "useEffect with []", "useMemo", "useCallback"],
    answer: 1,
  },
  {
    id: 3,
    type: "mcq",
    title: "CSS specificity",
    description: "Which selector has the highest specificity?",
    options: ["div p", ".class", "#id", "* { }"],
    answer: 2,
  },
  {
    id: 4,
    type: "coding",
    title: "Debounce function",
    description:
      "Implement a debounce function in JavaScript.\n\nfunction debounce(fn, delay) {\n  // your code here\n}",
  },
];

const STARTER_CODE: Record<string, string> = {
  HTML: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Solution</title>\n</head>\n<body>\n  <!-- your code here -->\n</body>\n</html>`,
  CSS: `/* your styles here */\n\n.container {\n  display: flex;\n  align-items: center;\n}`,
  JavaScript: `// your solution here\n\nfunction solution() {\n\n}`,
  TypeScript: `// your solution here\n\nfunction solution(): void {\n\n}`,
  "React (JSX)": `import React, { useState } from 'react'\n\nexport default function Solution() {\n  return (\n    <div>\n      {/* your code here */}\n    </div>\n  )\n}`,
};

const CHAT_INIT = [
  {
    from: "ai",
    text: "Hello! I'm your AI interviewer. Take your time reading the question. Feel free to ask me for hints.",
  },
];

export default function InterviewRoom() {
  const navigate = useNavigate();

  // Timer
  const [seconds, setSeconds] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(true);
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timerRunning]);
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const timerColor =
    seconds < 300
      ? "text-red-500"
      : seconds < 600
        ? "text-amber-500"
        : "text-foreground";

  // Editor
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(STARTER_CODE["JavaScript"]);
  const [output, setOutput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleLangChange(lang: string) {
    setLanguage(lang);
    setCode(STARTER_CODE[lang]);
    setOutput("");
  }

  function handleTab(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newVal = code.substring(0, start) + "  " + code.substring(end);
      setCode(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  }

  function runCode() {
    if (language === "JavaScript") {
      try {
        const logs: string[] = [];
        const fakeConsole = {
          log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
        };
        // eslint-disable-next-line no-new-func
        new Function("console", code)(fakeConsole);
        setOutput(
          logs.length ? logs.join("\n") : "✓ Ran successfully (no output)",
        );
      } catch (e: unknown) {
        setOutput("Error: " + (e instanceof Error ? e.message : String(e)));
      }
    } else {
      setOutput(
        `✓ ${language} code saved. (Live execution available for JavaScript only)`,
      );
    }
  }

  // Questions
  const [questionIdx, setQuestionIdx] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const question = AI_QUESTIONS[questionIdx];

  // Chat
  const [messages, setMessages] = useState(CHAT_INIT);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const AI_REPLIES = [
    "Good thinking! Try breaking the problem into smaller steps.",
    "That's a valid approach. Consider edge cases like empty inputs.",
    "Hint: Think about recursion for nested structures.",
    "You're on the right track! What's your time complexity?",
    "Great question. In React, re-renders happen when state or props change.",
  ];
  function sendMessage() {
    if (!chatInput.trim()) return;
    const userMsg = { from: "user", text: chatInput.trim() };
    const aiMsg = {
      from: "ai",
      text: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)],
    };
    setMessages((m) => [...m, userMsg]);
    setChatInput("");
    setTimeout(() => setMessages((m) => [...m, aiMsg]), 800);
  }

  // Panels
  const [rightPanel, setRightPanel] = useState<"question" | "chat">("question");
  const [showVideo, setShowVideo] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Interview Room</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Frontend Developer
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className={`text-sm font-mono font-semibold ${timerColor}`}>
            {mins}:{secs}
          </span>
          <button
            onClick={() => setTimerRunning((r) => !r)}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5"
          >
            {timerRunning ? "Pause" : "Resume"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVideo((v) => !v)}
            className="text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors"
          >
            {showVideo ? "Hide video" : "Show video"}
          </button>
          <button
            onClick={() => setShowSubmit(true)}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 transition-colors font-medium"
          >
            Submit & End
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — Code editor */}
        <div className="flex flex-col flex-1 overflow-hidden border-r border-border">
          {/* Language bar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-card shrink-0 overflow-x-auto">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {lang}
              </button>
            ))}
            <div className="ml-auto shrink-0">
              <button
                onClick={runCode}
                className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <polygon points="2,1 10,6 2,11" />
                </svg>
                Run
              </button>
            </div>
          </div>

          {/* Code textarea */}
          <div className="flex-1 overflow-hidden relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleTab}
              spellCheck={false}
              className="w-full h-full resize-none bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 outline-none leading-relaxed"
              style={{ caretColor: "#fff" }}
            />
          </div>

          {/* Output */}
          {output && (
            <div className="border-t border-border bg-muted shrink-0 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-1.5 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground">
                  Output
                </span>
                <button
                  onClick={() => setOutput("")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>
              <pre className="text-xs font-mono px-4 py-2 text-foreground whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>

        {/* RIGHT — Question / Chat panel */}
        <div className="w-80 flex flex-col shrink-0 overflow-hidden">
          {/* Panel tabs */}
          <div className="grid grid-cols-2 border-b border-border bg-card shrink-0">
            <button
              onClick={() => setRightPanel("question")}
              className={`py-2.5 text-xs font-medium transition-colors ${
                rightPanel === "question"
                  ? "bg-background border-b-2 border-blue-600 text-foreground"
                  : "text-muted-foreground hover:text-foreground bg-muted"
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setRightPanel("chat")}
              className={`py-2.5 text-xs font-medium transition-colors ${
                rightPanel === "chat"
                  ? "bg-background border-b-2 border-blue-600 text-foreground"
                  : "text-muted-foreground hover:text-foreground bg-muted"
              }`}
            >
              Chat / Notes
            </button>
          </div>

          {/* Question panel */}
          {rightPanel === "question" && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Question nav */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-card shrink-0 flex-wrap">
                {AI_QUESTIONS.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setQuestionIdx(i)}
                    className={`w-7 h-7 rounded-md text-xs font-semibold transition-colors ${
                      i === questionIdx
                        ? "bg-blue-600 text-white"
                        : mcqAnswers[i] !== undefined || i < questionIdx
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">
                  {questionIdx + 1}/{AI_QUESTIONS.length}
                </span>
              </div>

              {/* Question body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      question.type === "mcq"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {question.type === "mcq" ? "Multiple choice" : "Coding"}
                  </span>
                </div>
                <h3 className="font-semibold text-sm">{question.title}</h3>
                <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
                  {question.description}
                </pre>

                {/* MCQ options */}
                {question.type === "mcq" && question.options && (
                  <div className="space-y-2 mt-2">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setMcqAnswers((a) => ({ ...a, [questionIdx]: i }))
                        }
                        className={`w-full text-left text-xs px-3 py-2.5 rounded-lg border transition-colors ${
                          mcqAnswers[questionIdx] === i
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-border bg-background hover:bg-muted text-foreground"
                        }`}
                      >
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2 p-3 border-t border-border shrink-0">
                <button
                  disabled={questionIdx === 0}
                  onClick={() => setQuestionIdx((i) => i - 1)}
                  className="flex-1 h-8 text-xs border border-border rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  disabled={questionIdx === AI_QUESTIONS.length - 1}
                  onClick={() => setQuestionIdx((i) => i + 1)}
                  className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Chat panel */}
          {rightPanel === "chat" && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.from === "ai" && (
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center mr-2 shrink-0 mt-0.5">
                        AI
                      </div>
                    )}
                    <div
                      className={`text-xs rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                        m.from === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="border-t border-border p-3 shrink-0 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask for a hint..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 h-8 px-3 text-xs rounded-lg border border-border bg-background outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating video */}
      {showVideo && (
        <div className="fixed bottom-6 right-6 w-44 rounded-xl overflow-hidden border border-border shadow-lg bg-zinc-900 z-40">
          <div className="aspect-video bg-zinc-800 flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white text-lg font-bold">
              JD
            </div>
            <div className="absolute bottom-1.5 left-2 text-white text-xs font-medium opacity-80">
              You
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/80"
            >
              ×
            </button>
          </div>
          <div className="px-2 py-1.5 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-zinc-300">Live</span>
          </div>
        </div>
      )}

      {/* Submit modal */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                ✓
              </div>
              <h2 className="font-bold text-lg mb-1">Submit interview?</h2>
              <p className="text-sm text-muted-foreground">
                You've answered {Object.keys(mcqAnswers).length} of{" "}
                {AI_QUESTIONS.filter((q) => q.type === "mcq").length} MCQs. Your
                code will be saved automatically.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center mb-5">
              <div className="bg-muted rounded-xl p-3">
                <p className="text-lg font-bold text-blue-600">
                  {mins}:{secs}
                </p>
                <p className="text-xs text-muted-foreground">Time remaining</p>
              </div>
              <div className="bg-muted rounded-xl p-3">
                <p className="text-lg font-bold text-blue-600">
                  {AI_QUESTIONS.length}
                </p>
                <p className="text-xs text-muted-foreground">Total questions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmit(false)}
                className="flex-1 h-10 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Keep going
              </button>
              <button
                onClick={() => navigate("/results")}
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
