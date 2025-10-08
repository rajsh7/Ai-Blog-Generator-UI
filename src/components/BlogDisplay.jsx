'use client';
import { useEffect, useState, useRef } from 'react';
import { ClipLoader } from 'react-spinners';

export default function BlogDisplay({ content, loading }) {
  const [typedContent, setTypedContent] = useState('');
  const [typing, setTyping] = useState(false); // track typing animation
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!loading && content) {
      setTypedContent('');
      setTyping(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        setTypedContent((prev) => prev + content[i]);
        i++;
        if (i >= content.length) {
          clearInterval(intervalRef.current);
          setTyping(false);
        }
      }, 2); // fast typing
      return () => clearInterval(intervalRef.current);
    }
  }, [content, loading]);

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setTypedContent(content);
    setTyping(false);
  };

  return (
    <div className="border-t pt-4">
      {(loading || typing) && (
        <div className="flex items-center gap-4 py-6">
          <ClipLoader size={35} color="#3b82f6" />
          {typing && (
            <button
              onClick={handleStop}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Stop
            </button>
          )}
        </div>
      )}

      {!loading && typedContent && (
        <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">Generated Blog:</h2>
          <p>{typedContent}</p>
        </div>
      )}

      {!loading && !typedContent && (
        <p className="text-gray-500">Your AI-generated blog will appear here...</p>
      )}
    </div>
  );
}
