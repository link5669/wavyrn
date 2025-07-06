import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const SFXEditor = () => {
  const [sfxFormData, setSfxFormData] = useState({
    name: "",
    link: "",
  });
  const [sfxLoading, setSfxLoading] = useState(false);
  const [sfxMessage, setSfxMessage] = useState("");
  const [sfxMessageType, setSfxMessageType] = useState("");
  const [sfxList, setSfxList] = useState([]);
  const [loadingSfx, setLoadingSfx] = useState(false);
  const [sfxCurrentPage, setSfxCurrentPage] = useState(1);
  const [deletingSfx, setDeletingSfx] = useState(null);
  const [itemsPerPage] = useState(10);

  const sfxIndexOfLastItem = sfxCurrentPage * itemsPerPage;
  const sfxIndexOfFirstItem = sfxIndexOfLastItem - itemsPerPage;
  const sfxCurrentItems = sfxList.slice(
    sfxIndexOfFirstItem,
    sfxIndexOfLastItem,
  );
  const sfxTotalPages = Math.ceil(sfxList.length / itemsPerPage);

  const fetchSfxList = async () => {
    setLoadingSfx(true);
    try {
      const response = await fetch("http://localhost:5001/api/soundEffects");
      const data = await response.json();
      if (response.ok) {
        setSfxList(data.soundEffects || []);
      } else {
        console.error("Failed to fetch sound effects:", data.error);
      }
    } catch (error) {
      console.error("Error fetching sound effects:", error);
    } finally {
      setLoadingSfx(false);
    }
  };
  useEffect(() => {
    fetchSfxList();
  }, []);

  const handleSfxInputChange = (e) => {
    const { name, value } = e.target;
    setSfxFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSfxSubmit = async (e) => {
    e.preventDefault();
    setSfxLoading(true);
    setSfxMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/soundEffects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sfxFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setSfxMessage("Sound effect added successfully!");
        setSfxMessageType("success");
        setSfxFormData({ name: "", link: "" });
        fetchSfxList();
      } else {
        setSfxMessage(data.error || "Failed to add sound effect");
        setSfxMessageType("error");
      }
    } catch (error) {
      setSfxMessage("Network error: " + error.message);
      setSfxMessageType("error");
    } finally {
      setSfxLoading(false);
    }
  };

  const handleSfxDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sound effect?")) {
      return;
    }

    setDeletingSfx(id);
    try {
      const response = await fetch(
        `http://localhost:5001/api/soundEffects/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSfxMessage("Sound effect deleted successfully!");
        setSfxMessageType("success");
        fetchSfxList();
      } else {
        setSfxMessage(data.error || "Failed to delete sound effect");
        setSfxMessageType("error");
      }
    } catch (error) {
      setSfxMessage("Network error: " + error.message);
      setSfxMessageType("error");
    } finally {
      setDeletingSfx(null);
    }
  };
  const handleSfxPageChange = (pageNumber) => {
    setSfxCurrentPage(pageNumber);
  };
  return (
    <div>
      <h2>Add Sound Effect</h2>

      <form onSubmit={handleSfxSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Sound Effect Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={sfxFormData.name}
            onChange={handleSfxInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter sound effect name"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="link"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Sound Effect Link:
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={sfxFormData.link}
            onChange={handleSfxInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter sound effect URL"
          />
        </div>

        <button
          type="submit"
          disabled={sfxLoading}
          style={{
            backgroundColor: sfxLoading ? "#ccc" : "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: sfxLoading ? "not-allowed" : "pointer",
          }}
        >
          {sfxLoading ? "Adding..." : "Add Sound Effect"}
        </button>
      </form>

      {sfxMessage && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor:
              sfxMessageType === "success" ? "#d4edda" : "#f8d7da",
            color: sfxMessageType === "success" ? "#155724" : "#721c24",
            border:
              sfxMessageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {sfxMessage}
        </div>
      )}

      {/* Sound Effects List */}
      <div>
        <h3>Current Sound Effects ({sfxList.length} total)</h3>

        {loadingSfx ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading sound effects...
          </div>
        ) : (
          <>
            {sfxCurrentItems.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {sfxCurrentItems.map((sfx, index) => (
                  <div
                    key={sfx.id || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{ margin: "0 0 10px 0", color: "#333" }}
                        >
                          {sfx.name}
                        </h4>
                        <p
                          style={{
                            margin: "5px 0",
                            wordBreak: "break-all",
                          }}
                        >
                          <strong>Link:</strong>
                          <a
                            href={sfx.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              marginLeft: "5px",
                              color: "#007bff",
                            }}
                          >
                            {sfx.link}
                          </a>
                        </p>
                        {sfx.createdAt && (
                          <p
                            style={{
                              margin: "5px 0",
                              fontSize: "0.9em",
                              color: "#666",
                            }}
                          >
                            <strong>Added:</strong>{" "}
                            {new Date(
                              sfx.createdAt.seconds * 1000,
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleSfxDelete(sfx.id)}
                        disabled={deletingSfx === sfx.id}
                        style={{
                          backgroundColor:
                            deletingSfx === sfx.id ? "#ccc" : "#dc3545",
                          color: "white",
                          padding: "8px 15px",
                          border: "none",
                          borderRadius: "4px",
                          cursor:
                            deletingSfx === sfx.id
                              ? "not-allowed"
                              : "pointer",
                          marginLeft: "15px",
                        }}
                      >
                        {deletingSfx === sfx.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
                }}
              >
                No sound effects found. Add some using the form above!
              </div>
            )}

            {renderPaginationControls(
              sfxCurrentPage,
              sfxTotalPages,
              handleSfxPageChange,
              sfxIndexOfFirstItem,
              sfxIndexOfLastItem,
              sfxList.length,
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SFXEditor
