"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PaperAirplaneIcon, StopCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const controllerRef = useRef(null);
  const contentRef = useRef(null);

  // Auto-scroll for text
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content]);

  const menu = ["Dashboard", "History", "Settings"];

  // Generate or Stop generation
  const handleStartStop = async () => {
    if (loading) {
      if (controllerRef.current) controllerRef.current.abort();
      setLoading(false);
      return;
    }

    if (!topic.trim()) {
      alert("Please enter a topic first!");
      return;
    }

    setContent("");
    setLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Write a detailed, engaging, and SEO-friendly blog post about: "${topic}". Include an introduction, 3–4 main sections, and a conclusion. The tone should be professional yet conversational.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Smooth typing effect
      let displayed = "";
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (controller.signal.aborted) break;
        displayed += words[i] + " ";
        setContent(displayed);
        await new Promise((r) => setTimeout(r, 10));
      }

      // Save to history
      setHistory((prev) => [{ topic, content: text }, ...prev]);
    } catch (error) {
      console.error("❌ Error generating blog:", error);
      setContent("⚠️ Failed to generate blog content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Select history item
  const handleSelectHistory = (item) => {
    setTopic(item.topic);
    setContent(item.content);
    setActiveSection("Dashboard");
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-xl font-semibold text-center">
            AI Blog Generator
          </h2>
        </div>

        <nav className="flex flex-col gap-4">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`text-left px-3 py-2 rounded-lg hover:bg-blue-700 transition ${
                activeSection === item ? "bg-blue-800 font-bold" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <footer className="mt-auto text-sm text-blue-100 pt-6 border-t border-blue-500">
          © {new Date().getFullYear()} AI Blog
        </footer>
      </aside>

      {/* 🧠 Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        {activeSection === "Dashboard" && (
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
              🧠 AI Blog Generator
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div
                ref={contentRef}
                className="h-[400px] overflow-y-auto border border-gray-300 rounded-xl p-4 text-gray-800 bg-gray-50 mb-6 whitespace-pre-wrap"
              >
                {content || "👋 Enter a topic below to generate your blog."}
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-3xl p-2 shadow-md">
                <input
                  type="text"
                  placeholder="Enter blog topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-500 bg-transparent border-none focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={handleStartStop}
                  className={`flex items-center justify-center gap-2 px-5 py-2 rounded-2xl font-medium text-white transition-all duration-300 ${
                    loading
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <StopCircleIcon className="h-5 w-5" />
                      Stop
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "History" && (
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              🕓 History
            </h2>

            {history.length === 0 ? (
              <p className="text-center text-gray-600">No history yet.</p>
            ) : (
              <div className="space-y-4">
                {history.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectHistory(item)}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow hover:shadow-md cursor-pointer transition"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.topic}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === "Settings" && (
          <div className="w-full max-w-3xl text-center text-gray-700 mt-20">
            ⚙️ Settings section coming soon...
          </div>
        )}
      </div>
    </main>
  );
}
