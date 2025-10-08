export default function BlogHistory({ history, onSelect }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-3">🕓 Recent Blogs</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No blogs generated yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onSelect(item)}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition"
            >
              <strong>{item.topic}</strong>
              <p className="text-sm text-gray-600 truncate">{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
