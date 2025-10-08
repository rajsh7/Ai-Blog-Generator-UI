// src/components/Sidebar.jsx
export default function Sidebar({ activeSection, setActiveSection }) {
  const menu = ["Dashboard", "History", "Settings"];

  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10">
        <h2 className="text-xl font-semibold">AI Blog Generator</h2>
      </div>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setActiveSection(item)}
            className={`text-left px-3 py-2 rounded-lg hover:bg-blue-700 transition
              ${activeSection === item ? "bg-blue-800 font-bold" : ""}`}
          >
            {item}
          </button>
        ))}
      </nav>

      <footer className="mt-auto text-sm text-blue-100 pt-6 border-t border-blue-500">
        © {new Date().getFullYear()} AI Blog
      </footer>
    </aside>
  );
}
