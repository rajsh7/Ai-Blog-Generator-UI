'use client';
import { useState } from 'react';
import { PaperAirplaneIcon, StopCircleIcon } from '@heroicons/react/24/solid';

export default function BlogInput({ topic, setTopic, onGenerate, onStop, loading }) {
  return (
    <div className="fixed bottom-4 left-0 w-full flex justify-center px-4 z-50">
      <div className="relative w-full max-w-3xl flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-200">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a blog topic..."
          className="flex-1 bg-transparent border-none focus:outline-none px-4 py-3 text-gray-700 placeholder-gray-500"
        />

        {/* Start or Stop button */}
        {!loading ? (
          <button
            onClick={onGenerate}
            disabled={!topic.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
          </button>
        ) : (
          <button
            onClick={onStop}
            className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <StopCircleIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
