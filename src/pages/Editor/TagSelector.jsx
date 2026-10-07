import { useState, useEffect, useRef } from "react";
import { FiTrash2 } from "react-icons/fi";

const COLUMNS = [
  { category: "GENRE", label: "Genre" },
  { category: "TOPIC", label: "Topic" },
  { category: "PROJECT", label: "Project" },
];

const TagSelector = ({ tags, selected, onToggle, onAdd, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [newTags, setNewTags] = useState({ GENRE: "", TOPIC: "", PROJECT: "" });
  const containerRef = useRef(null);

  // Retract when the user clicks anywhere outside the selector
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleAdd = async (category) => {
    const name = newTags[category].trim();
    if (!name) return;
    if (await onAdd(category, name)) {
      setNewTags((prev) => ({ ...prev, [category]: "" }));
    }
  };

  const handleDelete = (e, tag) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this tag? It will be deleted from all blog posts!")) {
      onDelete(tag);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: "white",
          minHeight: "20px",
        }}
      >
        {selected.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {selected.map((topic) => (
              <span
                key={topic}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ color: "#999" }}>Click to select topics</span>
        )}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 50, // below the fixed navbar (150)
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {COLUMNS.map(({ category, label }, i) => (
            <div
              key={category}
              style={{
                display: "flex",
                flexDirection: "column",
                borderLeft: i > 0 ? "1px solid #ccc" : "none",
                minWidth: 0,
              }}
            >
              <div style={{ padding: "8px 12px", fontWeight: "bold", borderBottom: "1px solid #ccc", backgroundColor: "#f5f5f5" }}>
                {label}
              </div>

              <div style={{ maxHeight: "250px", overflowY: "auto", flex: 1 }}>
                {(tags[category] || []).length > 0 ? (
                  tags[category].map((tag) => (
                    <div
                      key={tag.docId}
                      onClick={() => onToggle(tag.name)}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        backgroundColor: selected.includes(tag.name) ? "#e3f2fd" : "white",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(tag.name)}
                        onChange={() => {}}
                        style={{ margin: 0 }}
                      />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{tag.name}</span>
                      <button
                        type="button"
                        title="Delete tag"
                        onClick={(e) => handleDelete(e, tag)}
                        style={{
                          marginLeft: "auto",
                          background: "none",
                          border: "none",
                          color: "#dc3545",
                          cursor: "pointer",
                          padding: "2px",
                          display: "flex",
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "12px", color: "#666", textAlign: "center", fontSize: "13px" }}>
                    No {label.toLowerCase()} tags yet.
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "4px", padding: "8px", borderTop: "1px solid #ccc" }}>
                <input
                  type="text"
                  value={newTags[category]}
                  onChange={(e) => setNewTags((prev) => ({ ...prev, [category]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd(category);
                    }
                  }}
                  placeholder={`New ${label.toLowerCase()} tag`}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "4px 6px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleAdd(category)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "4px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
