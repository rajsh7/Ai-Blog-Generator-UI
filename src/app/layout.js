// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'AI Blog Generator',
  description: 'Generate SEO-friendly blogs using Gemini AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
